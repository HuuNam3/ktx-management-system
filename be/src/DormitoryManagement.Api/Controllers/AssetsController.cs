using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class AssetsController : CrudControllerBase<Asset>
{
    public AssetsController(Services.Interfaces.ICrudService<Asset> service)
        : base(service)
    {
    }
}