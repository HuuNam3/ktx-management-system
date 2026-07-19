using DormitoryManagement.Api.Data;
using DormitoryManagement.Api.Entities;
using DormitoryManagement.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DormitoryManagement.Api.Repositories.Implementations;

public class CrudRepository<TEntity> : ICrudRepository<TEntity> where TEntity : BaseEntity
{
    private readonly AppDbContext dbContext;

    public CrudRepository(AppDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    private DbSet<TEntity> Entities => dbContext.Set<TEntity>();

    public async Task<List<TEntity>> GetAllAsync()
    {
        return await Entities.AsNoTracking()
            .Where(entity => entity.DeletedAt == null)
            .ToListAsync();
    }

    public async Task<TEntity?> GetByIdAsync(int id)
    {
        return await Entities.AsNoTracking()
            .FirstOrDefaultAsync(entity => entity.Id == id && entity.DeletedAt == null);
    }

    public async Task<TEntity> CreateAsync(TEntity entity)
    {
        entity.CreatedAt = DateTime.UtcNow;
        entity.UpdatedAt = null;
        entity.DeletedAt = null;

        Entities.Add(entity);
        await dbContext.SaveChangesAsync();

        return entity;
    }

    public async Task<TEntity?> UpdateAsync(int id, TEntity entity)
    {
        var existingEntity = await Entities.FirstOrDefaultAsync(currentEntity => currentEntity.Id == id && currentEntity.DeletedAt == null);
        if (existingEntity is null)
        {
            return null;
        }

        dbContext.Entry(existingEntity).CurrentValues.SetValues(entity);
        existingEntity.Id = id;
        existingEntity.CreatedAt = existingEntity.CreatedAt;
        existingEntity.UpdatedAt = DateTime.UtcNow;
        existingEntity.DeletedAt = null;

        await dbContext.SaveChangesAsync();

        return existingEntity;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existingEntity = await Entities.FirstOrDefaultAsync(currentEntity => currentEntity.Id == id && currentEntity.DeletedAt == null);
        if (existingEntity is null)
        {
            return false;
        }

        existingEntity.DeletedAt = DateTime.UtcNow;
        existingEntity.UpdatedAt = DateTime.UtcNow;

        await dbContext.SaveChangesAsync();

        return true;
    }
}