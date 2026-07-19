using DormitoryManagement.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DormitoryManagement.Api.Data.Configurations;

public class UtilityServiceConfiguration : IEntityTypeConfiguration<UtilityService>
{
    public void Configure(EntityTypeBuilder<UtilityService> builder)
    {
        builder.ToTable("utility_service");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Code)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(x => x.Unit)
            .HasMaxLength(50);

        builder.Property(x => x.DefaultUnitPrice)
            .HasPrecision(18, 2);

        builder.Property(x => x.CalculationType)
            .HasConversion<string>()
            .HasMaxLength(30);

        builder.Property(x => x.Description)
            .HasMaxLength(1000);

        builder.HasIndex(x => x.Code)
            .IsUnique();
    }
}