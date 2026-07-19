using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class ContractsController : CrudControllerBase<Contract>
{
    public ContractsController(Services.Interfaces.ICrudService<Contract> service)
        : base(service)
    {
    }
}