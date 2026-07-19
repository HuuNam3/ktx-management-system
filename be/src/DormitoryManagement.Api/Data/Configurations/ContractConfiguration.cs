using DormitoryManagement.Api.Entities;
using DormitoryManagement.Api.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DormitoryManagement.Api.Data.Configurations;

public class ContractConfiguration : IEntityTypeConfiguration<Contract>
{
    public void Configure(EntityTypeBuilder<Contract> builder)
    {
        builder.ToTable("contract");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.ContractCode)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(x => x.MonthlyRent)
            .HasPrecision(18, 2);

        builder.Property(x => x.DepositAmount)
            .HasPrecision(18, 2);

        builder.Property(x => x.PaymentDueDay)
            .IsRequired();

        builder.Property(x => x.Status)
            .HasConversion<string>()
            .HasMaxLength(30);

        builder.Property(x => x.TerminationReason)
            .HasMaxLength(1000);

        builder.Property(x => x.Terms)
            .HasMaxLength(4000);

        builder.Property(x => x.Note)
            .HasMaxLength(1000);

        builder.HasIndex(x => x.ContractCode)
            .IsUnique();

        builder.HasOne(x => x.Room)
            .WithMany(x => x.Contracts)
            .HasForeignKey(x => x.RoomId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Bed)
            .WithMany(x => x.Contracts)
            .HasForeignKey(x => x.BedId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.PrimaryTenant)
            .WithMany(x => x.PrimaryContracts)
            .HasForeignKey(x => x.PrimaryTenantId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.CreatedByUser)
            .WithMany(x => x.CreatedContracts)
            .HasForeignKey(x => x.CreatedBy)
            .OnDelete(DeleteBehavior.Restrict);
    }
}