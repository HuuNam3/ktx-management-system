namespace DormitoryManagement.Api.Entities;

public class NotificationRecipient : BaseEntity
{
    public int NotificationId { get; set; }

    public int? UserId { get; set; }

    public int? TenantId { get; set; }

    public bool IsRead { get; set; }

    public DateTime? ReadAt { get; set; }

    public Notification? Notification { get; set; }

    public User? User { get; set; }

    public Tenant? Tenant { get; set; }
}