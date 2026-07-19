namespace DormitoryManagement.Api.Entities;

public class ContractTenant : BaseEntity
{
    public int ContractId { get; set; }

    public int TenantId { get; set; }

    public bool IsPrimary { get; set; }

    public DateTime? MoveInDate { get; set; }

    public DateTime? MoveOutDate { get; set; }

    public string? Status { get; set; }

    public string? Note { get; set; }

    public Contract? Contract { get; set; }

    public Tenant? Tenant { get; set; }
}