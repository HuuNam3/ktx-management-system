using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class BuildingsController : CrudControllerBase<Building>
{
    public BuildingsController(Services.Interfaces.ICrudService<Building> service)
        : base(service)
    {
    }
}