using DormitoryManagement.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace DormitoryManagement.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Role> Roles => Set<Role>();

    public DbSet<User> Users => Set<User>();

    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    public DbSet<Building> Buildings => Set<Building>();

    public DbSet<RoomType> RoomTypes => Set<RoomType>();

    public DbSet<Room> Rooms => Set<Room>();

    public DbSet<Bed> Beds => Set<Bed>();

    public DbSet<Tenant> Tenants => Set<Tenant>();

    public DbSet<Contract> Contracts => Set<Contract>();

    public DbSet<ContractTenant> ContractTenants => Set<ContractTenant>();

    public DbSet<UtilityService> UtilityServices => Set<UtilityService>();

    public DbSet<Meter> Meters => Set<Meter>();

    public DbSet<MeterReading> MeterReadings => Set<MeterReading>();

    public DbSet<Invoice> Invoices => Set<Invoice>();

    public DbSet<InvoiceItem> InvoiceItems => Set<InvoiceItem>();

    public DbSet<Payment> Payments => Set<Payment>();

    public DbSet<Asset> Assets => Set<Asset>();

    public DbSet<RoomAsset> RoomAssets => Set<RoomAsset>();

    public DbSet<MaintenanceRequest> MaintenanceRequests => Set<MaintenanceRequest>();

    public DbSet<Notification> Notifications => Set<Notification>();

    public DbSet<NotificationRecipient> NotificationRecipients => Set<NotificationRecipient>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}