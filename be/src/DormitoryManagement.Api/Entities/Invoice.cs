using DormitoryManagement.Api.Enums;

namespace DormitoryManagement.Api.Entities;

public class Invoice : BaseEntity
{
    public string InvoiceCode { get; set; } = string.Empty;

    public int ContractId { get; set; }

    public DateTime BillingMonth { get; set; }

    public DateTime IssueDate { get; set; }

    public DateTime DueDate { get; set; }

    public decimal Subtotal { get; set; }

    public decimal DiscountAmount { get; set; }

    public decimal LateFee { get; set; }

    public decimal TotalAmount { get; set; }

    public decimal PaidAmount { get; set; }

    public InvoiceStatus Status { get; set; }

    public string? Note { get; set; }

    public int? CreatedBy { get; set; }

    public Contract? Contract { get; set; }

    public User? CreatedByUser { get; set; }

    public ICollection<InvoiceItem> InvoiceItems { get; set; } = new List<InvoiceItem>();

    public ICollection<Payment> Payments { get; set; } = new List<Payment>();
}