using DormitoryManagement.Api.Entities;

namespace DormitoryManagement.Api.Repositories.Interfaces;

public interface ICrudRepository<TEntity> where TEntity : BaseEntity
{
    Task<List<TEntity>> GetAllAsync();

    Task<TEntity?> GetByIdAsync(int id);

    Task<TEntity> CreateAsync(TEntity entity);

    Task<TEntity?> UpdateAsync(int id, TEntity entity);

    Task<bool> DeleteAsync(int id);
}