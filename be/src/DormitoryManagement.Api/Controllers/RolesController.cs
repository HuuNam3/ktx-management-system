using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class RolesController : CrudControllerBase<Role>
{
    public RolesController(Services.Interfaces.ICrudService<Role> service)
        : base(service)
    {
    }
}