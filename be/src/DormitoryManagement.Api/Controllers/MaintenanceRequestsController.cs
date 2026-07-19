using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class MaintenanceRequestsController : CrudControllerBase<MaintenanceRequest>
{
    public MaintenanceRequestsController(Services.Interfaces.ICrudService<MaintenanceRequest> service)
        : base(service)
    {
    }
}