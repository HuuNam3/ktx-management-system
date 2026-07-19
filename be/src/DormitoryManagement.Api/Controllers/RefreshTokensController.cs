using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class RefreshTokensController : CrudControllerBase<RefreshToken>
{
    public RefreshTokensController(Services.Interfaces.ICrudService<RefreshToken> service)
        : base(service)
    {
    }
}