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
        if (await db.Roles.AnyAsync()) return;

        var now = DateTime.UtcNow;
        var adminRole = new Role { Name = "Admin", Description = "Quản trị toàn hệ thống", CreatedAt = now };
        var managerRole = new Role { Name = "Manager", Description = "Quản lý ký túc xá", CreatedAt = now };
        var staffRole = new Role { Name = "Staff", Description = "Nhân viên vận hành", CreatedAt = now };
        db.Roles.AddRange(adminRole, managerRole, staffRole); await db.SaveChangesAsync();
        var admin = new User { RoleId = adminRole.Id, Username = "admin", PasswordHash = hasher.Hash("Admin@123"), FullName = "Quản trị viên", Email = "admin@ktx.local", Status = UserStatus.Active, CreatedAt = now };
        var manager = new User { RoleId = managerRole.Id, Username = "manager", PasswordHash = hasher.Hash("Manager@123"), FullName = "Nguyễn Quản Lý", Email = "manager@ktx.local", Status = UserStatus.Active, CreatedAt = now };
        db.Users.AddRange(admin, manager); await db.SaveChangesAsync();

        var building = new Building { Code = "A", Name = "Tòa A", Address = "Đường Đại học, TP. Hồ Chí Minh", NumberOfFloors = 5, IsActive = true, CreatedAt = now };
        var buildingB = new Building { Code = "B", Name = "Tòa B", Address = "Đường Đại học, TP. Hồ Chí Minh", NumberOfFloors = 4, IsActive = true, CreatedAt = now };
        var type4 = new RoomType { Code = "4P", Name = "Phòng 4 người", Capacity = 4, BasePrice = 1800000, Area = 28, IsActive = true, CreatedAt = now };
        var type6 = new RoomType { Code = "6P", Name = "Phòng 6 người", Capacity = 6, BasePrice = 1400000, Area = 36, IsActive = true, CreatedAt = now };
        db.Buildings.AddRange(building, buildingB); db.RoomTypes.AddRange(type4, type6); await db.SaveChangesAsync();
        var roomA101 = new Room { BuildingId = building.Id, RoomTypeId = type4.Id, Code = "A101", FloorNumber = 1, Status = RoomStatus.PartiallyOccupied, CurrentRent = 1800000, CreatedAt = now };
        var roomA102 = new Room { BuildingId = building.Id, RoomTypeId = type4.Id, Code = "A102", FloorNumber = 1, Status = RoomStatus.Available, CurrentRent = 1800000, CreatedAt = now };
        var roomB201 = new Room { BuildingId = buildingB.Id, RoomTypeId = type6.Id, Code = "B201", FloorNumber = 2, Status = RoomStatus.Occupied, CurrentRent = 1400000, CreatedAt = now };
        db.Rooms.AddRange(roomA101, roomA102, roomB201); await db.SaveChangesAsync();
        var beds = new[] { "A101-01", "A101-02", "A101-03", "A101-04" }.Select((code, i) => new Bed { RoomId = roomA101.Id, Code = code, Status = i == 0 ? BedStatus.Occupied : BedStatus.Available, MonthlyPrice = 1800000, CreatedAt = now }).Concat(new[] { "A102-01", "A102-02", "A102-03", "A102-04" }.Select(code => new Bed { RoomId = roomA102.Id, Code = code, Status = BedStatus.Available, MonthlyPrice = 1800000, CreatedAt = now })).Concat(new[] { "B201-01", "B201-02", "B201-03", "B201-04", "B201-05", "B201-06" }.Select(code => new Bed { RoomId = roomB201.Id, Code = code, Status = BedStatus.Occupied, MonthlyPrice = 1400000, CreatedAt = now })).ToList();
        db.Beds.AddRange(beds);
        var tenant1 = new Tenant { TenantCode = "TN0001", FullName = "Trần Minh Anh", DateOfBirth = new DateTime(2003, 5, 12), Gender = "Nữ", IdentityNumber = "079203000001", PhoneNumber = "0901000001", Email = "minhanh@example.com", Status = "Active", CreatedAt = now };
        var tenant2 = new Tenant { TenantCode = "TN0002", FullName = "Lê Quốc Bảo", DateOfBirth = new DateTime(2002, 9, 21), Gender = "Nam", IdentityNumber = "079203000002", PhoneNumber = "0901000002", Email = "quocbao@example.com", Status = "Active", CreatedAt = now };
        db.Tenants.AddRange(tenant1, tenant2); await db.SaveChangesAsync();
        var services = new[] { new UtilityService { Code = "ELEC", Name = "Điện", Unit = "kWh", DefaultUnitPrice = 3500, CalculationType = CalculationType.Meter, IsActive = true, CreatedAt = now }, new UtilityService { Code = "WATER", Name = "Nước", Unit = "m³", DefaultUnitPrice = 18000, CalculationType = CalculationType.Meter, IsActive = true, CreatedAt = now }, new UtilityService { Code = "NET", Name = "Internet", Unit = "tháng", DefaultUnitPrice = 100000, CalculationType = CalculationType.Fixed, IsActive = true, CreatedAt = now } };
        db.UtilityServices.AddRange(services); await db.SaveChangesAsync();
        var meters = new[] { new Meter { RoomId = roomA101.Id, UtilityServiceId = services[0].Id, MeterCode = "M-A101-E", InitialReading = 100, Status = "Active", CreatedAt = now }, new Meter { RoomId = roomA101.Id, UtilityServiceId = services[1].Id, MeterCode = "M-A101-W", InitialReading = 20, Status = "Active", CreatedAt = now }, new Meter { RoomId = roomB201.Id, UtilityServiceId = services[0].Id, MeterCode = "M-B201-E", InitialReading = 200, Status = "Active", CreatedAt = now } };
        db.Meters.AddRange(meters); await db.SaveChangesAsync();
        var contract = new Contract { ContractCode = "HD2026-0001", RoomId = roomA101.Id, BedId = beds[0].Id, PrimaryTenantId = tenant1.Id, StartDate = new DateTime(2026, 1, 1), EndDate = new DateTime(2026, 12, 31), MonthlyRent = 1800000, DepositAmount = 1800000, PaymentDueDay = 5, Status = ContractStatus.Active, SignedAt = new DateTime(2025, 12, 25), ActivatedAt = new DateTime(2026, 1, 1), CreatedBy = admin.Id, CreatedAt = now };
        db.Contracts.Add(contract); await db.SaveChangesAsync();
        db.ContractTenants.Add(new ContractTenant { ContractId = contract.Id, TenantId = tenant1.Id, IsPrimary = true, MoveInDate = contract.StartDate, Status = "Active", CreatedAt = now });
        var asset = new Asset { AssetCode = "ASSET-BED", Name = "Giường tầng", Category = "Nội thất", Unit = "cái", DefaultValue = "Mới", IsActive = true, CreatedAt = now };
        db.Assets.Add(asset); await db.SaveChangesAsync();
        var roomAsset = new RoomAsset { RoomId = roomA101.Id, AssetId = asset.Id, Quantity = 2, Condition = "Tốt", AssignedAt = contract.StartDate, PurchasePrice = 3500000, CreatedAt = now };
        db.RoomAssets.Add(roomAsset);
        var reading = new MeterReading { MeterId = meters[0].Id, ReadingMonth = new DateTime(2026, 6, 1), PreviousReading = 100, CurrentReading = 145, Consumption = 45, UnitPrice = 3500, Amount = 157500, RecordedBy = admin.Id, RecordedAt = now, CreatedAt = now };
        db.MeterReadings.Add(reading); await db.SaveChangesAsync();
        var invoice = new Invoice { InvoiceCode = "INV2026-0001", ContractId = contract.Id, BillingMonth = new DateTime(2026, 6, 1), IssueDate = new DateTime(2026, 6, 1), DueDate = new DateTime(2026, 6, 5), Subtotal = 1957500, TotalAmount = 1957500, PaidAmount = 1957500, Status = InvoiceStatus.Paid, CreatedBy = admin.Id, CreatedAt = now };
        db.Invoices.Add(invoice); await db.SaveChangesAsync();
        db.InvoiceItems.AddRange(new InvoiceItem { InvoiceId = invoice.Id, ItemType = InvoiceItemType.RoomRent, Description = "Tiền phòng tháng 06/2026", Quantity = 1, UnitPrice = 1800000, Amount = 1800000, CreatedAt = now }, new InvoiceItem { InvoiceId = invoice.Id, MeterReadingId = reading.Id, ItemType = InvoiceItemType.Electricity, Description = "Điện tháng 06/2026", Quantity = 45, UnitPrice = 3500, Amount = 157500, CreatedAt = now });
        db.Payments.Add(new Payment { InvoiceId = invoice.Id, PaymentCode = "PAY2026-0001", Amount = invoice.TotalAmount, PaymentMethod = PaymentMethod.BankTransfer, PaymentStatus = PaymentStatus.Completed, TransactionReference = "BANK-DEMO-0001", PaidAt = new DateTime(2026, 6, 3), ReceivedBy = admin.Id, CreatedAt = now });
        db.MaintenanceRequests.Add(new MaintenanceRequest { RequestCode = "MR2026-0001", RoomId = roomA101.Id, TenantId = tenant1.Id, RoomAssetId = roomAsset.Id, Title = "Bóng đèn hành lang bị hỏng", Description = "Đề nghị kiểm tra và thay bóng đèn.", Priority = MaintenancePriority.Medium, Status = MaintenanceStatus.Pending, RequestedAt = now, CreatedBy = admin.Id, CreatedAt = now });
        var notification = new Notification { Title = "Thông báo thu tiền tháng 06/2026", Content = "Vui lòng hoàn tất thanh toán trước ngày 05/06/2026.", NotificationType = NotificationType.Reminder, TargetType = NotificationTargetType.Tenant, Priority = NotificationPriority.Normal, BuildingId = building.Id, PublishedAt = now, Status = NotificationStatus.Published, CreatedBy = admin.Id, CreatedAt = now };
        db.Notifications.Add(notification); await db.SaveChangesAsync();
        db.NotificationRecipients.Add(new NotificationRecipient { NotificationId = notification.Id, TenantId = tenant1.Id, IsRead = false, CreatedAt = now });
        await db.SaveChangesAsync();
        logger.LogInformation("Database seeded with demo data. Login: admin / Admin@123");
    }
}
