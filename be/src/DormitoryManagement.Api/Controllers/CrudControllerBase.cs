using DormitoryManagement.Api.Common;
using DormitoryManagement.Api.Entities;
using DormitoryManagement.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace DormitoryManagement.Api.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public abstract class CrudControllerBase<TEntity> : ControllerBase where TEntity : BaseEntity
{
    private readonly ICrudService<TEntity> service;

    protected CrudControllerBase(ICrudService<TEntity> service)
    {
        this.service = service;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<TEntity>>>> GetAll()
    {
        var items = await service.GetAllAsync();

        return Ok(new ApiResponse<List<TEntity>>
        {
            Success = true,
            Message = "Lấy danh sách thành công.",
            Data = items
        });
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApiResponse<TEntity>>> GetById(int id)
    {
        var item = await service.GetByIdAsync(id);
        if (item is null)
        {
            return NotFound(new ApiResponse<TEntity>
            {
                Success = false,
                Message = "Không tìm thấy dữ liệu."
            });
        }

        return Ok(new ApiResponse<TEntity>
        {
            Success = true,
            Message = "Lấy dữ liệu thành công.",
            Data = item
        });
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<TEntity>>> Create([FromBody] TEntity entity)
    {
        var createdEntity = await service.CreateAsync(entity);

        return CreatedAtAction(nameof(GetById), new { id = createdEntity.Id }, new ApiResponse<TEntity>
        {
            Success = true,
            Message = "Tạo mới thành công.",
            Data = createdEntity
        });
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ApiResponse<TEntity>>> Update(int id, [FromBody] TEntity entity)
    {
        var updatedEntity = await service.UpdateAsync(id, entity);
        if (updatedEntity is null)
        {
            return NotFound(new ApiResponse<TEntity>
            {
                Success = false,
                Message = "Không tìm thấy dữ liệu cần cập nhật."
            });
        }

        return Ok(new ApiResponse<TEntity>
        {
            Success = true,
            Message = "Cập nhật thành công.",
            Data = updatedEntity
        });
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<ApiResponse<object>>> Delete(int id)
    {
        var deleted = await service.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Không tìm thấy dữ liệu cần xóa."
            });
        }

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Xóa thành công."
        });
    }
}
