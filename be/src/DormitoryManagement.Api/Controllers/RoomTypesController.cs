using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class RoomTypesController : CrudControllerBase<RoomType>
{
    public RoomTypesController(Services.Interfaces.ICrudService<RoomType> service)
        : base(service)
    {
    }
}