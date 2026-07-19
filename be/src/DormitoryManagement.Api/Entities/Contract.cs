using DormitoryManagement.Api.Enums;

namespace DormitoryManagement.Api.Entities;

public class Contract : BaseEntity
{
    public string ContractCode { get; set; } = string.Empty;

    public int RoomId { get; set; }

    public int BedId { get; set; }

    public int PrimaryTenantId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public decimal MonthlyRent { get; set; }

    public decimal DepositAmount { get; set; }

    public int PaymentDueDay { get; set; }

    public ContractStatus Status { get; set; }

    public DateTime? SignedAt { get; set; }

    public DateTime? ActivatedAt { get; set; }

    public DateTime? TerminatedAt { get; set; }

    public string? TerminationReason { get; set; }

    public string? Terms { get; set; }

    public string? Note { get; set; }

    public int? CreatedBy { get; set; }

    public Room? Room { get; set; }

    public Bed? Bed { get; set; }

    public Tenant? PrimaryTenant { get; set; }

    public User? CreatedByUser { get; set; }

    public ICollection<ContractTenant> ContractTenants { get; set; } = new List<ContractTenant>();

    public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();
}