using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class NotificationsController : CrudControllerBase<Notification>
{
    public NotificationsController(Services.Interfaces.ICrudService<Notification> service)
        : base(service)
    {
    }
}