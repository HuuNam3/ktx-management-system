using DormitoryManagement.Api.Enums;

namespace DormitoryManagement.Api.Entities;

public class MaintenanceRequest : BaseEntity
{
    public string RequestCode { get; set; } = string.Empty;

    public int RoomId { get; set; }

    public int? TenantId { get; set; }

    public int? RoomAssetId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public MaintenancePriority Priority { get; set; }

    public MaintenanceStatus Status { get; set; }

    public decimal? EstimatedCost { get; set; }

    public decimal? ActualCost { get; set; }

    public int? AssignedTo { get; set; }

    public DateTime RequestedAt { get; set; }

    public DateTime? StartedAt { get; set; }

    public DateTime? CompletedAt { get; set; }

    public string? ResolutionNote { get; set; }

    public int? CreatedBy { get; set; }

    public Room? Room { get; set; }

    public Tenant? Tenant { get; set; }

    public RoomAsset? RoomAsset { get; set; }

    public User? AssignedToUser { get; set; }

    public User? CreatedByUser { get; set; }
}