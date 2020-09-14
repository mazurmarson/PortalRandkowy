using Microsoft.EntityFrameworkCore;
using PortalRandkowy.API.Models;


namespace PortalRandkowy.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Like> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Like>().HasKey(k => new { k.userLikesId, k.UserIsLikedId });

            builder.Entity<Like>()
            .HasOne(u => u.UserIsLiked)
            .WithMany(u => u.UserLikes)
            .HasForeignKey(u => u.UserIsLikedId)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Like>()
            .HasOne(u => u.UserIsLiked)
            .WithMany(u => u.UserLikes)
            .HasForeignKey(u => u.userLikesId)
            .OnDelete(DeleteBehavior.Restrict);


        }
    }

}