using DormitoryManagement.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DormitoryManagement.Api.Data.Configurations;

public class MeterConfiguration : IEntityTypeConfiguration<Meter>
{
    public void Configure(EntityTypeBuilder<Meter> builder)
    {
        builder.ToTable("meter");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.MeterCode)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(x => x.InitialReading)
            .HasPrecision(18, 2);

        builder.Property(x => x.Status)
            .HasMaxLength(30);

        builder.Property(x => x.Description)
            .HasMaxLength(1000);

        builder.HasIndex(x => x.MeterCode)
            .IsUnique();

        builder.HasIndex(x => new { x.RoomId, x.UtilityServiceId })
            .IsUnique();

        builder.HasOne(x => x.Room)
            .WithMany(x => x.Meters)
            .HasForeignKey(x => x.RoomId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.UtilityService)
            .WithMany(x => x.Meters)
            .HasForeignKey(x => x.UtilityServiceId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}