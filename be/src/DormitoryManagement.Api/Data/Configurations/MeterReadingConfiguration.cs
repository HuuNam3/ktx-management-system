using DormitoryManagement.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DormitoryManagement.Api.Data.Configurations;

public class MeterReadingConfiguration : IEntityTypeConfiguration<MeterReading>
{
    public void Configure(EntityTypeBuilder<MeterReading> builder)
    {
        builder.ToTable("meter_reading");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.ReadingMonth)
            .IsRequired();

        builder.Property(x => x.PreviousReading)
            .HasPrecision(18, 2);

        builder.Property(x => x.CurrentReading)
            .HasPrecision(18, 2);

        builder.Property(x => x.Consumption)
            .HasPrecision(18, 2);

        builder.Property(x => x.UnitPrice)
            .HasPrecision(18, 2);

        builder.Property(x => x.Amount)
            .HasPrecision(18, 2);

        builder.Property(x => x.Note)
            .HasMaxLength(1000);

        builder.HasIndex(x => new { x.MeterId, x.ReadingMonth })
            .IsUnique();

        builder.HasOne(x => x.Meter)
            .WithMany(x => x.MeterReadings)
            .HasForeignKey(x => x.MeterId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.RecordedByUser)
            .WithMany(x => x.MeterReadingsRecorded)
            .HasForeignKey(x => x.RecordedBy)
            .OnDelete(DeleteBehavior.Restrict);
    }
}