using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class RoomsController : CrudControllerBase<Room>
{
    public RoomsController(Services.Interfaces.ICrudService<Room> service)
        : base(service)
    {
    }
}