namespace DormitoryManagement.Api.Entities;

public class RoomType : BaseEntity
{
    public string Code { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public int Capacity { get; set; }

    public decimal BasePrice { get; set; }

    public decimal? Area { get; set; }

    public string? Description { get; set; }

    public bool IsActive { get; set; }

    public ICollection<Room> Rooms { get; set; } = new List<Room>();
}