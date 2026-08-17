using DormitoryManagement.Api.Authentication;
using DormitoryManagement.Api.Entities;
using DormitoryManagement.Api.Enums;
using Microsoft.EntityFrameworkCore;

namespace DormitoryManagement.Api.Data.Seed;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(AppDbContext db, PasswordHasher hasher, ILogger logger)
    {
        await db.Database.EnsureCreatedAsync();

        var now = DateTime.UtcNow;
        var adminRole = await EnsureRole(db, "Admin", "Quản trị toàn hệ thống", now);
        var managerRole = await EnsureRole(db, "Manager", "Quản lý ký túc xá", now);
        var staffRole = await EnsureRole(db, "Staff", "Nhân viên vận hành", now);
        var admin = await EnsureUser(db, adminRole.Id, "admin", "admin", "Quản trị viên", "admin@ktx.local", hasher, now);
        var manager = await EnsureUser(db, managerRole.Id, "manager", "Manager@123", "Nguyễn Văn A", "manager@ktx.local", hasher, now);
        await EnsureUser(db, staffRole.Id, "letan1", "Staff@123", "Lễ tân 1", "letan1@ktx.local", hasher, now);
        await EnsureUser(db, staffRole.Id, "letan2", "Staff@123", "Lễ tân 2", "letan2@ktx.local", hasher, now);

        if (await db.Rooms.AnyAsync(room => room.Code == "A201"))
        {
            logger.LogInformation("Demo data already exists. Login: admin / Admin@123");
            return;
        }

        var buildingA = await EnsureBuilding(db, "A", "Dãy A", now);
        var buildingB = await EnsureBuilding(db, "B", "Dãy B", now);
        var buildingC = await EnsureBuilding(db, "C", "Dãy C", now);
        var type4 = await EnsureRoomType(db, "4P", "Phòng 4 người", 4, 1250000, 28, now);
        var type6 = await EnsureRoomType(db, "6P", "Phòng 6 người", 6, 1050000, 36, now);
        var type8 = await EnsureRoomType(db, "8P", "Phòng 8 người", 8, 900000, 44, now);

        var rooms = new[]
        {
            Room(buildingA.Id, type4.Id, type4.BasePrice, "A201", 2, RoomStatus.PartiallyOccupied, 2),
            Room(buildingA.Id, type4.Id, type4.BasePrice, "A202", 2, RoomStatus.Occupied, 4),
            Room(buildingA.Id, type4.Id, type4.BasePrice, "A203", 2, RoomStatus.Available, 0),
            Room(buildingA.Id, type4.Id, type4.BasePrice, "A204", 2, RoomStatus.PartiallyOccupied, 3),
            Room(buildingA.Id, type4.Id, type4.BasePrice, "A205", 2, RoomStatus.Maintenance, 0),
            Room(buildingA.Id, type6.Id, type6.BasePrice, "A301", 3, RoomStatus.PartiallyOccupied, 4),
            Room(buildingA.Id, type6.Id, type6.BasePrice, "A302", 3, RoomStatus.Occupied, 6),
            Room(buildingA.Id, type6.Id, type6.BasePrice, "A303", 3, RoomStatus.PartiallyOccupied, 2),
            Room(buildingB.Id, type4.Id, type4.BasePrice, "B201", 2, RoomStatus.Occupied, 4),
            Room(buildingB.Id, type4.Id, type4.BasePrice, "B202", 2, RoomStatus.PartiallyOccupied, 1),
            Room(buildingB.Id, type6.Id, type6.BasePrice, "B203", 2, RoomStatus.PartiallyOccupied, 5),
            Room(buildingB.Id, type6.Id, type6.BasePrice, "B204", 2, RoomStatus.Available, 0),
            Room(buildingB.Id, type6.Id, type6.BasePrice, "B205", 2, RoomStatus.PartiallyOccupied, 3),
            Room(buildingB.Id, type6.Id, type6.BasePrice, "B305", 3, RoomStatus.PartiallyOccupied, 4),
            Room(buildingC.Id, type6.Id, type6.BasePrice, "C102", 1, RoomStatus.PartiallyOccupied, 3),
            Room(buildingC.Id, type4.Id, type4.BasePrice, "C108", 1, RoomStatus.PartiallyOccupied, 2),
        };
        db.Rooms.AddRange(rooms);
        await db.SaveChangesAsync();

        var beds = new List<Bed>();
        foreach (var room in rooms)
        {
            var capacity = room.RoomTypeId == type4.Id ? 4 : 6;
            for (var i = 1; i <= capacity; i++)
            {
                beds.Add(new Bed
                {
                    RoomId = room.Id,
                    Code = $"{room.Code}-G{i}",
                    Status = i <= int.Parse(room.Description ?? "0") ? BedStatus.Occupied : BedStatus.Available,
                    MonthlyPrice = room.CurrentRent,
                    CreatedAt = now
                });
            }
        }
        db.Beds.AddRange(beds);
        await db.SaveChangesAsync();

        var tenants = new[]
        {
            Tenant("SV001", "Nguyễn Văn A", "079123456789", "0901234567", "Sinh viên", "A301", now),
            Tenant("SV002", "Trần Thị B", "079987654321", "0909876543", "Khách vãng lai", "B205", now),
            Tenant("SV003", "Lê Văn C", "079555666777", "0912345678", "Học viên lái xe", "C108", now),
            Tenant("SV004", "Phạm Thị D", "079111222333", "0923456789", "Sinh viên", "A201", now),
            Tenant("SV005", "Hoàng Văn E", "079444555666", "0934567890", "Sinh viên", "B305", now),
            Tenant("SV006", "Võ Thị F", "079777888999", "0945678901", "Sinh viên", "C102", now),
            Tenant("SV007", "Lê Văn D", "079222333444", "0956789012", "Khách vãng lai", "B205", now),
            Tenant("SV008", "Phạm Thị E", "079333444555", "0967890123", "Sinh viên", "A201", now),
        };
        db.Tenants.AddRange(tenants);
        await db.SaveChangesAsync();

        var contracts = new List<Contract>();
        foreach (var tenant in tenants)
        {
            var roomCode = tenant.CurrentAddress ?? "A301";
            var room = rooms.First(x => x.Code == roomCode);
            var bed = beds.First(x => x.RoomId == room.Id && x.Status == BedStatus.Occupied && contracts.All(c => c.BedId != x.Id));
            contracts.Add(new Contract
            {
                ContractCode = $"HD2026-{tenant.TenantCode}",
                RoomId = room.Id,
                BedId = bed.Id,
                PrimaryTenantId = tenant.Id,
                StartDate = tenant.FullName == "Phạm Thị D" ? Utc(2026, 2, 1) : Utc(2026, 3, 1),
                EndDate = Utc(2026, 12, 31),
                MonthlyRent = room.CurrentRent,
                DepositAmount = room.CurrentRent,
                PaymentDueDay = 5,
                Status = ContractStatus.Active,
                SignedAt = Utc(2026, 2, 25),
                ActivatedAt = Utc(2026, 3, 1),
                CreatedBy = admin.Id,
                CreatedAt = now
            });
        }
        db.Contracts.AddRange(contracts);
        await db.SaveChangesAsync();
        db.ContractTenants.AddRange(contracts.Select(c => new ContractTenant { ContractId = c.Id, TenantId = c.PrimaryTenantId, IsPrimary = true, MoveInDate = c.StartDate, Status = "Active", CreatedAt = now }));

        var electric = await EnsureUtilityService(db, "ELEC", "Điện", "kWh", 1700, CalculationType.Meter, now);
        var water = await EnsureUtilityService(db, "WATER", "Nước", "m³", 15000, CalculationType.Meter, now);
        await EnsureUtilityService(db, "MEAL", "Vé ăn", "suất", 25000, CalculationType.Fixed, now);
        await EnsureUtilityService(db, "PARKING", "Vé xe", "tháng", 50000, CalculationType.Fixed, now);

        await SeedMetersAndReadings(db, rooms, electric, water, admin.Id, now);
        await SeedInvoicesAndPayments(db, contracts, tenants, admin.Id, now);
        await SeedIncidents(db, rooms, tenants, admin.Id, now);
        await SeedActivityLogs(db, admin.Id, manager.Id, now);

        var notification = new Notification
        {
            Title = "Phòng A201 chưa thanh toán tiền tháng 3",
            Content = "Vui lòng nhắc sinh viên hoàn tất thanh toán trước hạn.",
            NotificationType = NotificationType.Warning,
            TargetType = NotificationTargetType.Room,
            Priority = NotificationPriority.High,
            BuildingId = buildingA.Id,
            RoomId = rooms.First(x => x.Code == "A201").Id,
            PublishedAt = now,
            Status = NotificationStatus.Published,
            CreatedBy = manager.Id,
            CreatedAt = now
        };
        db.Notifications.Add(notification);
        await db.SaveChangesAsync();

        logger.LogInformation("Database seeded with KTX Tây Đô demo data. Login: admin / Admin@123");
    }

    private static Room Room(int buildingId, int typeId, decimal rent, string code, int floor, RoomStatus status, int occupied)
        => new() { BuildingId = buildingId, RoomTypeId = typeId, Code = code, FloorNumber = floor, Status = status, CurrentRent = rent, Description = occupied.ToString(), CreatedAt = DateTime.UtcNow };

    private static Tenant Tenant(string code, string name, string identity, string phone, string occupation, string room, DateTime now)
        => new() { TenantCode = code, FullName = name, DateOfBirth = Utc(2003, 1, 1), Gender = name.Contains("Thị") ? "Nữ" : "Nam", IdentityNumber = identity, PhoneNumber = phone, Email = $"{code.ToLower()}@ktx.local", Occupation = occupation, CurrentAddress = room, Status = "Active", CreatedAt = now };

    private static DateTime Utc(int year, int month, int day) => new(year, month, day, 0, 0, 0, DateTimeKind.Utc);

    private static async Task<Role> EnsureRole(AppDbContext db, string name, string description, DateTime now)
    {
        var role = await db.Roles.FirstOrDefaultAsync(x => x.Name == name);
        if (role is not null) return role;
        role = new Role { Name = name, Description = description, CreatedAt = now };
        db.Roles.Add(role);
        await db.SaveChangesAsync();
        return role;
    }

    private static async Task<User> EnsureUser(AppDbContext db, int roleId, string username, string password, string fullName, string email, PasswordHasher hasher, DateTime now)
    {
        var user = await db.Users.FirstOrDefaultAsync(x => x.Username == username);
        if (user is not null)
        {
            user.RoleId = roleId;
            user.FullName = fullName;
            user.Email = email;
            user.Status = UserStatus.Active;

            var passwordMatches = false;
            try
            {
                passwordMatches = hasher.Verify(password, user.PasswordHash);
            }
            catch
            {
                passwordMatches = false;
            }

            if (!passwordMatches)
            {
                user.PasswordHash = hasher.Hash(password);
            }

            await db.SaveChangesAsync();
            return user;
        }
        user = new User { RoleId = roleId, Username = username, PasswordHash = hasher.Hash(password), FullName = fullName, Email = email, Status = UserStatus.Active, CreatedAt = now };
        db.Users.Add(user);
        await db.SaveChangesAsync();
        return user;
    }

    private static async Task<Building> EnsureBuilding(AppDbContext db, string code, string name, DateTime now)
    {
        var building = await db.Buildings.FirstOrDefaultAsync(x => x.Code == code);
        if (building is not null) return building;
        building = new Building { Code = code, Name = name, Address = "KTX Tây Đô", NumberOfFloors = 5, IsActive = true, CreatedAt = now };
        db.Buildings.Add(building);
        await db.SaveChangesAsync();
        return building;
    }

    private static async Task<RoomType> EnsureRoomType(AppDbContext db, string code, string name, int capacity, decimal price, decimal area, DateTime now)
    {
        var roomType = await db.RoomTypes.FirstOrDefaultAsync(x => x.Code == code);
        if (roomType is not null) return roomType;
        roomType = new RoomType { Code = code, Name = name, Capacity = capacity, BasePrice = price, Area = area, IsActive = true, CreatedAt = now };
        db.RoomTypes.Add(roomType);
        await db.SaveChangesAsync();
        return roomType;
    }

    private static async Task<UtilityService> EnsureUtilityService(AppDbContext db, string code, string name, string unit, decimal price, CalculationType calculationType, DateTime now)
    {
        var service = await db.UtilityServices.FirstOrDefaultAsync(x => x.Code == code);
        if (service is not null) return service;
        service = new UtilityService { Code = code, Name = name, Unit = unit, DefaultUnitPrice = price, CalculationType = calculationType, IsActive = true, CreatedAt = now };
        db.UtilityServices.Add(service);
        await db.SaveChangesAsync();
        return service;
    }

    private static async Task SeedMetersAndReadings(AppDbContext db, Room[] rooms, UtilityService electric, UtilityService water, int adminId, DateTime now)
    {
        var meterRows = new[]
        {
            ("A201", 1250m, 1420m, 45m, 53m),
            ("A202", 1100m, 1245m, 38m, 45m),
            ("B305", 980m, 1180m, 52m, 62m),
        };
        foreach (var row in meterRows)
        {
            var room = rooms.First(x => x.Code == row.Item1);
            var eMeter = new Meter { RoomId = room.Id, UtilityServiceId = electric.Id, MeterCode = $"M-{room.Code}-E", InitialReading = row.Item2, InstalledAt = Utc(2026, 1, 1), Status = "Active", CreatedAt = now };
            var wMeter = new Meter { RoomId = room.Id, UtilityServiceId = water.Id, MeterCode = $"M-{room.Code}-W", InitialReading = row.Item4, InstalledAt = Utc(2026, 1, 1), Status = "Active", CreatedAt = now };
            db.Meters.AddRange(eMeter, wMeter);
            await db.SaveChangesAsync();
            db.MeterReadings.AddRange(
                new MeterReading { MeterId = eMeter.Id, ReadingMonth = Utc(2026, 3, 1), PreviousReading = row.Item2, CurrentReading = row.Item3, Consumption = row.Item3 - row.Item2, UnitPrice = 1700, Amount = (row.Item3 - row.Item2) * 1700, RecordedBy = adminId, RecordedAt = now, CreatedAt = now },
                new MeterReading { MeterId = wMeter.Id, ReadingMonth = Utc(2026, 3, 1), PreviousReading = row.Item4, CurrentReading = row.Item5, Consumption = row.Item5 - row.Item4, UnitPrice = 15000, Amount = (row.Item5 - row.Item4) * 15000, RecordedBy = adminId, RecordedAt = now, CreatedAt = now });
        }
        await db.SaveChangesAsync();
    }

    private static async Task SeedInvoicesAndPayments(AppDbContext db, List<Contract> contracts, Tenant[] tenants, int adminId, DateTime now)
    {
        var debts = new[]
        {
            ("Nguyễn Văn A", 1259000m, 0m, InvoiceStatus.Overdue, Utc(2026, 4, 5), "Tiền phòng + điện nước"),
            ("Trần Thị B", 1150000m, 0m, InvoiceStatus.Unpaid, Utc(2026, 4, 10), "Tiền phòng + vé ăn"),
            ("Lê Văn C", 871000m, 500000m, InvoiceStatus.PartiallyPaid, Utc(2026, 4, 8), "Tiền phòng + điện nước + phí"),
        };
        var index = 1;
        foreach (var item in debts)
        {
            var tenant = tenants.First(x => x.FullName == item.Item1);
            var contract = contracts.First(x => x.PrimaryTenantId == tenant.Id);
            var invoice = new Invoice { InvoiceCode = $"INV2026-03-{index:000}", ContractId = contract.Id, BillingMonth = Utc(2026, 3, 1), IssueDate = Utc(2026, 3, 25), DueDate = item.Item5, Subtotal = item.Item2, TotalAmount = item.Item2, PaidAmount = item.Item3, Status = item.Item4, Note = item.Item6, CreatedBy = adminId, CreatedAt = now };
            db.Invoices.Add(invoice);
            await db.SaveChangesAsync();
            db.InvoiceItems.Add(new InvoiceItem { InvoiceId = invoice.Id, ItemType = InvoiceItemType.RoomRent, Description = item.Item6, Quantity = 1, UnitPrice = item.Item2, Amount = item.Item2, CreatedAt = now });
            if (item.Item3 > 0)
            {
                db.Payments.Add(new Payment { InvoiceId = invoice.Id, PaymentCode = $"PAY2026-03-{index:000}", Amount = item.Item3, PaymentMethod = PaymentMethod.Cash, PaymentStatus = PaymentStatus.Completed, PaidAt = Utc(2026, 3, 28), ReceivedBy = adminId, CreatedAt = now });
            }
            index++;
        }
        await db.SaveChangesAsync();
    }

    private static async Task SeedIncidents(AppDbContext db, Room[] rooms, Tenant[] tenants, int adminId, DateTime now)
    {
        db.MaintenanceRequests.AddRange(
            new MaintenanceRequest { RequestCode = "SC2026-001", RoomId = rooms.First(x => x.Code == "A301").Id, TenantId = tenants.First(x => x.FullName == "Nguyễn Văn A").Id, Title = "Hư hỏng thiết bị", Description = "Quạt trần hỏng", Priority = MaintenancePriority.High, Status = MaintenanceStatus.Pending, EstimatedCost = 500000, RequestedAt = Utc(2026, 3, 25), CreatedBy = adminId, CreatedAt = now },
            new MaintenanceRequest { RequestCode = "SC2026-002", RoomId = rooms.First(x => x.Code == "B205").Id, Title = "Vi phạm nội quy", Description = "Nấu ăn trong phòng", Priority = MaintenancePriority.Medium, Status = MaintenanceStatus.Completed, EstimatedCost = 200000, ActualCost = 200000, RequestedAt = Utc(2026, 3, 24), CompletedAt = Utc(2026, 3, 24), CreatedBy = adminId, CreatedAt = now },
            new MaintenanceRequest { RequestCode = "SC2026-003", RoomId = rooms.First(x => x.Code == "C108").Id, TenantId = tenants.First(x => x.FullName == "Trần Thị B").Id, Title = "Hư hỏng cơ sở", Description = "Cửa sổ bị vỡ kính", Priority = MaintenancePriority.High, Status = MaintenanceStatus.Pending, EstimatedCost = 800000, RequestedAt = Utc(2026, 3, 23), CreatedBy = adminId, CreatedAt = now });
        await db.SaveChangesAsync();
    }

    private static async Task SeedActivityLogs(AppDbContext db, int adminId, int managerId, DateTime now)
    {
        db.AuditLogs.AddRange(
            new AuditLog { UserId = adminId, Action = "Check-in", EntityName = "Reception", EntityId = "079123456789", NewValues = "Nguyễn Văn A • Phòng A301 • 09:15", CreatedAt = now },
            new AuditLog { UserId = adminId, Action = "Thanh toán", EntityName = "Payment", EntityId = "079987654321", NewValues = "Trần Thị C • 850K • 09:02", CreatedAt = now },
            new AuditLog { UserId = adminId, Action = "Check-out", EntityName = "Reception", EntityId = "079222333444", NewValues = "Lê Văn D • Phòng B205 • 08:45", CreatedAt = now },
            new AuditLog { UserId = managerId, Action = "Duyệt 238", EntityName = "Profile238", EntityId = "SV004", NewValues = "Phạm Thị E • Approved • 08:30", CreatedAt = now },
            new AuditLog { UserId = adminId, Action = "Mua vé ăn", EntityName = "Ticket", EntityId = "079444555666", NewValues = "Hoàng Văn F • 500K • 08:15", CreatedAt = now });
        await db.SaveChangesAsync();
    }
}
