using Microsoft.AspNetCore.Mvc;

namespace DormitoryManagement.Api.Controllers;

[ApiController]
[Route("api/reception-logs")]
public sealed class ReceptionLogsController : ControllerBase
{
    private static readonly List<ReceptionLogDto> Entries =
    [
        new(1, "09:15:32", "checkin", "Nguyễn Văn A", "079123456789", "A301", "Thủ công", "Lễ tân 1"),
        new(2, "09:02:15", "checkout", "Trần Thị B", "079987654321", "B205", "Thủ công", "Lễ tân 1"),
        new(3, "08:45:22", "checkin", "Lê Văn C", "079555666777", "C108", "QR Code", "Auto"),
        new(4, "08:30:45", "checkout", "Phạm Thị D", "079111222333", "A201", "Thủ công", "Lễ tân 2"),
        new(5, "08:15:10", "checkin", "Hoàng Văn E", "079444555666", "B305", "QR Code", "Auto"),
        new(6, "08:00:33", "checkin", "Võ Thị F", "079777888999", "C102", "Thủ công", "Lễ tân 1"),
    ];

    [HttpGet("stats")]
    public ActionResult<ReceptionLogStatsDto> GetStats()
    {
        return Ok(new ReceptionLogStatsDto(45, 23, 68, 32));
    }

    [HttpGet]
    public ActionResult<IEnumerable<ReceptionLogDto>> GetEntries([FromQuery] string type = "all", [FromQuery] string? search = null)
    {
        var query = Entries.AsEnumerable();

        if (!string.Equals(type, "all", StringComparison.OrdinalIgnoreCase))
        {
            query = query.Where(entry => string.Equals(entry.Type, type, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var keyword = search.Trim();
            query = query.Where(entry =>
                entry.FullName.Contains(keyword, StringComparison.OrdinalIgnoreCase) ||
                entry.Cccd.Contains(keyword, StringComparison.OrdinalIgnoreCase) ||
                entry.Room.Contains(keyword, StringComparison.OrdinalIgnoreCase));
        }

        return Ok(query);
    }

    [HttpPost]
    public ActionResult<ReceptionLogDto> CreateEntry(CreateReceptionLogRequest request)
    {
        var entry = new ReceptionLogDto(
            Entries.Max(item => item.Id) + 1,
            DateTime.Now.ToString("HH:mm:ss"),
            request.Type,
            request.FullName,
            request.Cccd,
            request.Room,
            request.Method,
            request.Staff);

        Entries.Insert(0, entry);
        return CreatedAtAction(nameof(GetEntries), new { id = entry.Id }, entry);
    }
}

public sealed record ReceptionLogStatsDto(int TodayCheckins, int TodayCheckouts, int TotalEntries, int TotalExits);

public sealed record ReceptionLogDto(
    int Id,
    string Time,
    string Type,
    string FullName,
    string Cccd,
    string Room,
    string Method,
    string Staff);

public sealed record CreateReceptionLogRequest(
    string Type,
    string FullName,
    string Cccd,
    string Room,
    string Method,
    string Staff);
