using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class NotificationRecipientsController : CrudControllerBase<NotificationRecipient>
{
    public NotificationRecipientsController(Services.Interfaces.ICrudService<NotificationRecipient> service)
        : base(service)
    {
    }
}