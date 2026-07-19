namespace DormitoryManagement.Api.DTOs.Auth;

public sealed record LoginRequest(string Username, string Password);
public sealed record RegisterRequest(string Username, string Password, string FullName, string Email, string? PhoneNumber);
public sealed record RefreshTokenRequest(string RefreshToken);
public sealed record AuthResponse(string AccessToken, DateTime AccessTokenExpiresAt, string RefreshToken, DateTime RefreshTokenExpiresAt, int UserId, string Username, string Role);
