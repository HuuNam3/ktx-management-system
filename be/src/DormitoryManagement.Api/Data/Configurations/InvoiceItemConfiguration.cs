using DormitoryManagement.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DormitoryManagement.Api.Data.Configurations;

public class InvoiceItemConfiguration : IEntityTypeConfiguration<InvoiceItem>
{
    public void Configure(EntityTypeBuilder<InvoiceItem> builder)
    {
        builder.ToTable("invoice_item");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.ItemType)
            .HasConversion<string>()
            .HasMaxLength(30);

        builder.Property(x => x.Description)
            .HasMaxLength(1000);

        builder.Property(x => x.Quantity)
            .HasPrecision(18, 2);

        builder.Property(x => x.UnitPrice)
            .HasPrecision(18, 2);

        builder.Property(x => x.Amount)
            .HasPrecision(18, 2);

        builder.HasOne(x => x.Invoice)
            .WithMany(x => x.InvoiceItems)
            .HasForeignKey(x => x.InvoiceId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.MeterReading)
            .WithMany(x => x.InvoiceItems)
            .HasForeignKey(x => x.MeterReadingId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}