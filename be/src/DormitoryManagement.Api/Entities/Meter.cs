using DormitoryManagement.Api.Enums;

namespace DormitoryManagement.Api.Entities;

public class Meter : BaseEntity
{
    public int RoomId { get; set; }

    public int UtilityServiceId { get; set; }

    public string MeterCode { get; set; } = string.Empty;

    public decimal InitialReading { get; set; }

    public DateTime? InstalledAt { get; set; }

    public string? Status { get; set; }

    public string? Description { get; set; }

    public Room? Room { get; set; }

    public UtilityService? UtilityService { get; set; }

    public ICollection<MeterReading> MeterReadings { get; set; } = new List<MeterReading>();
}