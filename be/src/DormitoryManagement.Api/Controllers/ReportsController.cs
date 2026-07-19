using DormitoryManagement.Api.Common;
using DormitoryManagement.Api.Data;
using DormitoryManagement.Api.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DormitoryManagement.Api.Controllers;

[ApiController, Authorize, Route("api/reports")]
public sealed class ReportsController(AppDbContext db) : ControllerBase
{
    [HttpGet("dashboard")]
    public async Task<ActionResult<ApiResponse<object>>> Dashboard()
    {
        var data = new
        {
            Buildings = await db.Buildings.CountAsync(x => x.IsActive && x.DeletedAt == null),
            Rooms = await db.Rooms.CountAsync(x => x.DeletedAt == null),
            OccupiedRooms = await db.Rooms.CountAsync(x => x.Status == RoomStatus.Occupied || x.Status == RoomStatus.PartiallyOccupied),
            Tenants = await db.Tenants.CountAsync(x => x.DeletedAt == null),
            ActiveContracts = await db.Contracts.CountAsync(x => x.Status == ContractStatus.Active),
            OutstandingAmount = await db.Invoices.Where(x => x.Status != InvoiceStatus.Paid && x.Status != InvoiceStatus.Cancelled).SumAsync(x => x.TotalAmount - x.PaidAmount),
            Revenue = await db.Payments.Where(x => x.PaymentStatus == PaymentStatus.Completed).SumAsync(x => x.Amount)
        };
        return Ok(new ApiResponse<object> { Success = true, Message = "Lấy báo cáo tổng quan thành công.", Data = data });
    }
}
