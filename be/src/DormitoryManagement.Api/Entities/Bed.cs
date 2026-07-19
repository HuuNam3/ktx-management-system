using DormitoryManagement.Api.Enums;

namespace DormitoryManagement.Api.Entities;

public class Bed : BaseEntity
{
    public int RoomId { get; set; }

    public string Code { get; set; } = string.Empty;

    public BedStatus Status { get; set; }

    public decimal MonthlyPrice { get; set; }

    public string? Description { get; set; }

    public Room? Room { get; set; }

    public ICollection<Contract> Contracts { get; set; } = new List<Contract>();
}