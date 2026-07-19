using DormitoryManagement.Api.Enums;

namespace DormitoryManagement.Api.Entities;

public class Notification : BaseEntity
{
    public string Title { get; set; } = string.Empty;

    public string Content { get; set; } = string.Empty;

    public NotificationType NotificationType { get; set; }

    public NotificationTargetType TargetType { get; set; }

    public int? BuildingId { get; set; }

    public int? RoomId { get; set; }

    public NotificationPriority Priority { get; set; }

    public DateTime? PublishedAt { get; set; }

    public DateTime? ExpiresAt { get; set; }

    public NotificationStatus Status { get; set; }

    public int? CreatedBy { get; set; }

    public Building? Building { get; set; }

    public Room? Room { get; set; }

    public User? CreatedByUser { get; set; }

    public ICollection<NotificationRecipient> NotificationRecipients { get; set; } = new List<NotificationRecipient>();
}