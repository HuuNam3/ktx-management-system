using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class ContractTenantsController : CrudControllerBase<ContractTenant>
{
    public ContractTenantsController(Services.Interfaces.ICrudService<ContractTenant> service)
        : base(service)
    {
    }
}