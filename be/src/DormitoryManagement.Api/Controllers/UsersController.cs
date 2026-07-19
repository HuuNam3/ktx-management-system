using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Controllers;

public class UsersController : CrudControllerBase<User>
{
    public UsersController(Services.Interfaces.ICrudService<User> service)
        : base(service)
    {
    }
}