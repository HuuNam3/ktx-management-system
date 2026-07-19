using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class MeterReadingsController : CrudControllerBase<MeterReading>
{
    public MeterReadingsController(Services.Interfaces.ICrudService<MeterReading> service)
        : base(service)
    {
    }
}