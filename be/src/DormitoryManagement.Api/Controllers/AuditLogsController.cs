using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class AuditLogsController : CrudControllerBase<AuditLog>
{
    public AuditLogsController(Services.Interfaces.ICrudService<AuditLog> service)
        : base(service)
    {
    }
}