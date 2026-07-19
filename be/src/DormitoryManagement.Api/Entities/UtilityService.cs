using DormitoryManagement.Api.Enums;

namespace DormitoryManagement.Api.Entities;

public class UtilityService : BaseEntity
{
    public string Code { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string? Unit { get; set; }

    public decimal DefaultUnitPrice { get; set; }

    public CalculationType CalculationType { get; set; }

    public string? Description { get; set; }

    public bool IsActive { get; set; }

    public ICollection<Meter> Meters { get; set; } = new List<Meter>();
}