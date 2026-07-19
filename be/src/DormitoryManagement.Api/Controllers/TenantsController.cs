using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class TenantsController : CrudControllerBase<Tenant>
{
    public TenantsController(Services.Interfaces.ICrudService<Tenant> service)
        : base(service)
    {
    }
}