using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class MetersController : CrudControllerBase<Meter>
{
    public MetersController(Services.Interfaces.ICrudService<Meter> service)
        : base(service)
    {
    }
}