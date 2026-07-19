namespace DormitoryManagement.Api.Authentication;

public sealed class JwtOptions
{
    public const string SectionName = "Jwt";
    public string Issuer { get; set; } = "DormitoryManagement.Api";
    public string Audience { get; set; } = "DormitoryManagement.Client";
    public string Key { get; set; } = string.Empty;
    public int AccessTokenMinutes { get; set; } = 60;
    public int RefreshTokenDays { get; set; } = 7;
}
