using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class RoomAssetsController : CrudControllerBase<RoomAsset>
{
    public RoomAssetsController(Services.Interfaces.ICrudService<RoomAsset> service)
        : base(service)
    {
    }
}