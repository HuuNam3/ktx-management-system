using DormitoryManagement.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DormitoryManagement.Api.Data.Configurations;

public class AssetConfiguration : IEntityTypeConfiguration<Asset>
{
    public void Configure(EntityTypeBuilder<Asset> builder)
    {
        builder.ToTable("asset");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.AssetCode)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(x => x.Category)
            .HasMaxLength(100);

        builder.Property(x => x.Unit)
            .HasMaxLength(50);

        builder.Property(x => x.DefaultValue)
            .HasMaxLength(100);

        builder.Property(x => x.Description)
            .HasMaxLength(1000);

        builder.HasIndex(x => x.AssetCode)
            .IsUnique();
    }
}