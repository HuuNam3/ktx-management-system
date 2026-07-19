using DormitoryManagement.Api.Enums;

namespace DormitoryManagement.Api.Entities;

public class Payment : BaseEntity
{
    public int InvoiceId { get; set; }

    public string PaymentCode { get; set; } = string.Empty;

    public decimal Amount { get; set; }

    public PaymentMethod PaymentMethod { get; set; }

    public PaymentStatus PaymentStatus { get; set; }

    public string? TransactionReference { get; set; }

    public DateTime? PaidAt { get; set; }

    public int? ReceivedBy { get; set; }

    public string? Note { get; set; }

    public Invoice? Invoice { get; set; }

    public User? ReceivedByUser { get; set; }
}