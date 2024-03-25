using Microsoft.EntityFrameworkCore;
using dot_net_blog.Models;

namespace dot_net_blog.Data
{
    public class BlogContext : DbContext
    {
        public BlogContext(DbContextOptions<BlogContext> options)
            : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }
    }
}
