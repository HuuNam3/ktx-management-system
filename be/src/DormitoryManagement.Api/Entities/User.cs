using DormitoryManagement.Api.Enums;

namespace DormitoryManagement.Api.Entities;

public class User : BaseEntity
{
    public int RoleId { get; set; }

    public string Username { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string? PhoneNumber { get; set; }

    public string? AvatarUrl { get; set; }

    public UserStatus Status { get; set; }

    public DateTime? LastLoginAt { get; set; }

    public Role? Role { get; set; }

    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();

    public ICollection<Contract> CreatedContracts { get; set; } = new List<Contract>();

    public ICollection<Invoice> CreatedInvoices { get; set; } = new List<Invoice>();

    public ICollection<Payment> ReceivedPayments { get; set; } = new List<Payment>();

    public ICollection<MeterReading> MeterReadingsRecorded { get; set; } = new List<MeterReading>();

    public ICollection<MaintenanceRequest> AssignedMaintenanceRequests { get; set; } = new List<MaintenanceRequest>();

    public ICollection<MaintenanceRequest> CreatedMaintenanceRequests { get; set; } = new List<MaintenanceRequest>();

    public ICollection<Notification> CreatedNotifications { get; set; } = new List<Notification>();

    public ICollection<NotificationRecipient> NotificationRecipients { get; set; } = new List<NotificationRecipient>();
}