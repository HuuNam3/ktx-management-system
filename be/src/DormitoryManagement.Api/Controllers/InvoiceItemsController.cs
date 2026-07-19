using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class InvoiceItemsController : CrudControllerBase<InvoiceItem>
{
    public InvoiceItemsController(Services.Interfaces.ICrudService<InvoiceItem> service)
        : base(service)
    {
    }
}