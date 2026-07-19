using DormitoryManagement.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DormitoryManagement.Api.Data.Configurations;

public class TenantConfiguration : IEntityTypeConfiguration<Tenant>
{
    public void Configure(EntityTypeBuilder<Tenant> builder)
    {
        builder.ToTable("tenant");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.TenantCode)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(x => x.FullName)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(x => x.Gender)
            .HasMaxLength(20);

        builder.Property(x => x.IdentityNumber)
            .HasMaxLength(50);

        builder.Property(x => x.IdentityIssuedPlace)
            .HasMaxLength(200);

        builder.Property(x => x.PhoneNumber)
            .HasMaxLength(20);

        builder.Property(x => x.Email)
            .HasMaxLength(200);

        builder.Property(x => x.PermanentAddress)
            .HasMaxLength(500);

        builder.Property(x => x.CurrentAddress)
            .HasMaxLength(500);

        builder.Property(x => x.Occupation)
            .HasMaxLength(200);

        builder.Property(x => x.Workplace)
            .HasMaxLength(200);

        builder.Property(x => x.EmergencyContactName)
            .HasMaxLength(200);

        builder.Property(x => x.EmergencyContactPhone)
            .HasMaxLength(20);

        builder.Property(x => x.EmergencyContactRelationship)
            .HasMaxLength(100);

        builder.Property(x => x.AvatarUrl)
            .HasMaxLength(500);

        builder.Property(x => x.IdentityFrontImageUrl)
            .HasMaxLength(500);

        builder.Property(x => x.IdentityBackImageUrl)
            .HasMaxLength(500);

        builder.Property(x => x.Status)
            .HasMaxLength(30);

        builder.HasIndex(x => x.TenantCode)
            .IsUnique();

        builder.HasIndex(x => x.IdentityNumber)
            .IsUnique();
    }
}