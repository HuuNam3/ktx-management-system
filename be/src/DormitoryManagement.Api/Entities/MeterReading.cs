namespace DormitoryManagement.Api.Entities;

public class MeterReading : BaseEntity
{
    public int MeterId { get; set; }

    public DateTime ReadingMonth { get; set; }

    public decimal PreviousReading { get; set; }

    public decimal CurrentReading { get; set; }

    public decimal Consumption { get; set; }

    public decimal UnitPrice { get; set; }

    public decimal Amount { get; set; }

    public int? RecordedBy { get; set; }

    public DateTime RecordedAt { get; set; }

    public string? Note { get; set; }

    public Meter? Meter { get; set; }

    public User? RecordedByUser { get; set; }

    public ICollection<InvoiceItem> InvoiceItems { get; set; } = new List<InvoiceItem>();
}