using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class BedsController : CrudControllerBase<Bed>
{
    public BedsController(Services.Interfaces.ICrudService<Bed> service)
        : base(service)
    {
    }
}