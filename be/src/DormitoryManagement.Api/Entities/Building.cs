namespace DormitoryManagement.Api.Entities;

public class Building : BaseEntity
{
    public string Code { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string? Address { get; set; }

    public int NumberOfFloors { get; set; }

    public string? Description { get; set; }

    public bool IsActive { get; set; }

    public ICollection<Room> Rooms { get; set; } = new List<Room>();

    public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}