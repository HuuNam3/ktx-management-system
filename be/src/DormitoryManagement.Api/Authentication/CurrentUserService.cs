using System.Security.Claims;

namespace DormitoryManagement.Api.Authentication;

public sealed class CurrentUserService(IHttpContextAccessor accessor)
{
    public int? UserId => int.TryParse(accessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;
}
