using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public DbSet<Value> Values { get; set; }
        
        public DbSet<User> Users { get; set; }
        
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Like>()
                .HasKey(k => new { k.LikerId, k.LikeeId });
            
            builder.Entity<Like>()
                .HasOne(like => like.Likee)
                .WithMany(users => users.Likers)
                .HasForeignKey(like => like.LikeeId)
                .OnDelete(DeleteBehavior.Restrict);
            
            builder.Entity<Like>()
                .HasOne(like => like.Liker)
                .WithMany(users => users.Likees)
                .HasForeignKey(like => like.LikerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}