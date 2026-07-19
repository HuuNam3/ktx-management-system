using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class InvoicesController : CrudControllerBase<Invoice>
{
    public InvoicesController(Services.Interfaces.ICrudService<Invoice> service)
        : base(service)
    {
    }
}