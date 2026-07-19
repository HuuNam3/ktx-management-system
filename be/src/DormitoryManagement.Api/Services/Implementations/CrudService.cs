using DormitoryManagement.Api.Entities;
using DormitoryManagement.Api.Repositories.Interfaces;
using DormitoryManagement.Api.Services.Interfaces;

namespace DormitoryManagement.Api.Services.Implementations;

public class CrudService<TEntity> : ICrudService<TEntity> where TEntity : BaseEntity
{
    private readonly ICrudRepository<TEntity> repository;

    public CrudService(ICrudRepository<TEntity> repository)
    {
        this.repository = repository;
    }

    public Task<List<TEntity>> GetAllAsync()
    {
        return repository.GetAllAsync();
    }

    public Task<TEntity?> GetByIdAsync(int id)
    {
        return repository.GetByIdAsync(id);
    }

    public Task<TEntity> CreateAsync(TEntity entity)
    {
        return repository.CreateAsync(entity);
    }

    public Task<TEntity?> UpdateAsync(int id, TEntity entity)
    {
        return repository.UpdateAsync(id, entity);
    }

    public Task<bool> DeleteAsync(int id)
    {
        return repository.DeleteAsync(id);
    }
}