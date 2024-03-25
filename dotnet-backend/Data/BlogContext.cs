using Microsoft.EntityFrameworkCore;
using dot_net_blog.Models;

namespace dot_net_blog.Data
{
    public class BlogContext(DbContextOptions<BlogContext> options) : DbContext(options)
    {
        public DbSet<Post> Posts { get; set; }

        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>()
                .HasOne(comment => comment.Post)
                .WithMany(post => post.Comments)
                .HasForeignKey(comment => comment.PostId);

        }

    }
}
