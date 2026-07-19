using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class UtilityServicesController : CrudControllerBase<UtilityService>
{
    public UtilityServicesController(Services.Interfaces.ICrudService<UtilityService> service)
        : base(service)
    {
    }
}