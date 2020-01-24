using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        /// <summary>
        /// Injection DataContext
        /// </summary>
        /// <param name="context">Entity framework</param>
        public DatingRepository(DataContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Add user or photos
        /// </summary>
        /// <param name="entity">user or photos</param>
        /// <typeparam name="T"></typeparam>
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        
        /// <summary>
        /// Delete user or photos
        /// </summary>
        /// <param name="entity">user or photos</param>
        /// <typeparam name="T"></typeparam>
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        
        /// <summary>
        /// Save all changes
        /// </summary>
        /// <returns></returns>
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        
        /// <summary>
        /// Get all user with photos
        /// </summary>
        /// <returns>list user</returns>
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.Include(p => p.Photos)
                .ToListAsync();
        }
        
        /// <summary>
        /// Get user
        /// </summary>
        /// <param name="id">user 's id</param>
        /// <returns>user</returns>
        public async Task<User> GetUser(int id)
        {
            return await _context.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }
    }
}