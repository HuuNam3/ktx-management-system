using DormitoryManagement.Api.Enums;

namespace DormitoryManagement.Api.Entities;

public class Room : BaseEntity
{
    public int BuildingId { get; set; }

    public int RoomTypeId { get; set; }

    public string Code { get; set; } = string.Empty;

    public int FloorNumber { get; set; }

    public RoomStatus Status { get; set; }

    public decimal CurrentRent { get; set; }

    public string? Description { get; set; }

    public Building? Building { get; set; }

    public RoomType? RoomType { get; set; }

    public ICollection<Bed> Beds { get; set; } = new List<Bed>();

    public ICollection<Contract> Contracts { get; set; } = new List<Contract>();

    public ICollection<Meter> Meters { get; set; } = new List<Meter>();

    public ICollection<RoomAsset> RoomAssets { get; set; } = new List<RoomAsset>();

    public ICollection<MaintenanceRequest> MaintenanceRequests { get; set; } = new List<MaintenanceRequest>();

    public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}