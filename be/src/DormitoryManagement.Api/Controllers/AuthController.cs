using DormitoryManagement.Api.Authentication;
using DormitoryManagement.Api.Common;
using DormitoryManagement.Api.Data;
using DormitoryManagement.Api.DTOs.Auth;
using DormitoryManagement.Api.Entities;
using DormitoryManagement.Api.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DormitoryManagement.Api.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(AppDbContext db, JwtService jwt, PasswordHasher hasher) : ControllerBase
{
    [AllowAnonymous, HttpPost("login")]
    public async Task<ActionResult<ApiResponse<AuthResponse>>> Login(LoginRequest request)
    {
        var user = await db.Users.Include(x => x.Role).SingleOrDefaultAsync(x => x.Username == request.Username && x.DeletedAt == null);
        if (user is null || user.Status != UserStatus.Active || !hasher.Verify(request.Password, user.PasswordHash))
            return Unauthorized(new ApiResponse<AuthResponse> { Success = false, Message = "Tên đăng nhập hoặc mật khẩu không đúng." });
        user.LastLoginAt = DateTime.UtcNow;
        return Ok(new ApiResponse<AuthResponse> { Success = true, Message = "Đăng nhập thành công.", Data = await IssueTokens(user) });
    }

    [Authorize(Roles = "Admin"), HttpPost("register")]
    public async Task<ActionResult<ApiResponse<object>>> Register(RegisterRequest request)
    {
        if (await db.Users.AnyAsync(x => x.Username == request.Username || x.Email == request.Email))
            return Conflict(new ApiResponse<object> { Success = false, Message = "Tên đăng nhập hoặc email đã tồn tại." });
        var role = await db.Roles.SingleAsync(x => x.Name == "Staff");
        var user = new User { Username = request.Username, PasswordHash = hasher.Hash(request.Password), FullName = request.FullName, Email = request.Email, PhoneNumber = request.PhoneNumber, RoleId = role.Id, Status = UserStatus.Active };
        db.Users.Add(user); await db.SaveChangesAsync();
        return Ok(new ApiResponse<object> { Success = true, Message = "Tạo tài khoản thành công.", Data = new { user.Id, user.Username } });
    }

    [AllowAnonymous, HttpPost("refresh")]
    public async Task<ActionResult<ApiResponse<AuthResponse>>> Refresh(RefreshTokenRequest request)
    {
        var token = await db.RefreshTokens.Include(x => x.User!).ThenInclude(x => x.Role).SingleOrDefaultAsync(x => x.Token == request.RefreshToken);
        if (token is null || token.RevokedAt != null || token.ExpiresAt <= DateTime.UtcNow || token.User is null || token.User.Status != UserStatus.Active)
            return Unauthorized(new ApiResponse<AuthResponse> { Success = false, Message = "Refresh token không hợp lệ hoặc đã hết hạn." });
        token.RevokedAt = DateTime.UtcNow;
        var response = await IssueTokens(token.User);
        await db.SaveChangesAsync();
        return Ok(new ApiResponse<AuthResponse> { Success = true, Message = "Làm mới token thành công.", Data = response });
    }

    private async Task<AuthResponse> IssueTokens(User user)
    {
        var access = jwt.CreateAccessToken(user);
        var refresh = new RefreshToken { UserId = user.Id, Token = jwt.CreateRefreshToken(), ExpiresAt = jwt.RefreshTokenExpiry };
        db.RefreshTokens.Add(refresh); await db.SaveChangesAsync();
        return new AuthResponse(access.Token, access.ExpiresAt, refresh.Token, refresh.ExpiresAt, user.Id, user.Username, user.Role?.Name ?? "");
    }
}
