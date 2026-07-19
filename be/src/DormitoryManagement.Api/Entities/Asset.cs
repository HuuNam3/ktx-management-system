namespace DormitoryManagement.Api.Entities;

public class Asset : BaseEntity
{
    public string AssetCode { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string? Category { get; set; }

    public string? Unit { get; set; }

    public string? DefaultValue { get; set; }

    public string? Description { get; set; }

    public bool IsActive { get; set; }

    public ICollection<RoomAsset> RoomAssets { get; set; } = new List<RoomAsset>();
}