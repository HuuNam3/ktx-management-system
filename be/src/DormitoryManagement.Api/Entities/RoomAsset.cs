namespace DormitoryManagement.Api.Entities;

public class RoomAsset : BaseEntity
{
    public int RoomId { get; set; }

    public int AssetId { get; set; }

    public decimal Quantity { get; set; }

    public string? Condition { get; set; }

    public DateTime? AssignedAt { get; set; }

    public decimal? PurchasePrice { get; set; }

    public string? SerialNumber { get; set; }

    public string? Note { get; set; }

    public Room? Room { get; set; }

    public Asset? Asset { get; set; }

    public ICollection<MaintenanceRequest> MaintenanceRequests { get; set; } = new List<MaintenanceRequest>();
}