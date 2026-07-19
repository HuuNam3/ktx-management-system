using DormitoryManagement.Api.Enums;

namespace DormitoryManagement.Api.Entities;

public class Tenant : BaseEntity
{
    public string TenantCode { get; set; } = string.Empty;

    public string FullName { get; set; } = string.Empty;

    public DateTime? DateOfBirth { get; set; }

    public string? Gender { get; set; }

    public string? IdentityNumber { get; set; }

    public DateTime? IdentityIssuedDate { get; set; }

    public string? IdentityIssuedPlace { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Email { get; set; }

    public string? PermanentAddress { get; set; }

    public string? CurrentAddress { get; set; }

    public string? Occupation { get; set; }

    public string? Workplace { get; set; }

    public string? EmergencyContactName { get; set; }

    public string? EmergencyContactPhone { get; set; }

    public string? EmergencyContactRelationship { get; set; }

    public string? AvatarUrl { get; set; }

    public string? IdentityFrontImageUrl { get; set; }

    public string? IdentityBackImageUrl { get; set; }

    public string? Status { get; set; }

    public ICollection<Contract> PrimaryContracts { get; set; } = new List<Contract>();

    public ICollection<ContractTenant> ContractTenants { get; set; } = new List<ContractTenant>();

    public ICollection<MaintenanceRequest> MaintenanceRequests { get; set; } = new List<MaintenanceRequest>();

    public ICollection<NotificationRecipient> NotificationRecipients { get; set; } = new List<NotificationRecipient>();
}