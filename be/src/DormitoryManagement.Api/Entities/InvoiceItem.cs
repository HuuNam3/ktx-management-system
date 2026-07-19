using DormitoryManagement.Api.Enums;

namespace DormitoryManagement.Api.Entities;

public class InvoiceItem : BaseEntity
{
    public int InvoiceId { get; set; }

    public int? MeterReadingId { get; set; }

    public InvoiceItemType ItemType { get; set; }

    public string? Description { get; set; }

    public decimal Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public decimal Amount { get; set; }

    public Invoice? Invoice { get; set; }

    public MeterReading? MeterReading { get; set; }
}