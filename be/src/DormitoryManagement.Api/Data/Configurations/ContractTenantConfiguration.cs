using DormitoryManagement.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DormitoryManagement.Api.Data.Configurations;

public class ContractTenantConfiguration : IEntityTypeConfiguration<ContractTenant>
{
    public void Configure(EntityTypeBuilder<ContractTenant> builder)
    {
        builder.ToTable("contract_tenant");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Note)
            .HasMaxLength(1000);

        builder.Property(x => x.Status)
            .HasMaxLength(30);

        builder.HasIndex(x => new { x.ContractId, x.TenantId })
            .IsUnique();

        builder.HasOne(x => x.Contract)
            .WithMany(x => x.ContractTenants)
            .HasForeignKey(x => x.ContractId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Tenant)
            .WithMany(x => x.ContractTenants)
            .HasForeignKey(x => x.TenantId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}