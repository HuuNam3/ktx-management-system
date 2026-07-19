using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class PaymentsController : CrudControllerBase<Payment>
{
    public PaymentsController(Services.Interfaces.ICrudService<Payment> service)
        : base(service)
    {
    }
}