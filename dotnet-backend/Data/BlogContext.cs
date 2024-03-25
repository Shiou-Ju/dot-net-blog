using Microsoft.EntityFrameworkCore;
using dot_net_blog.Models;

namespace dot_net_blog.Data
{
    public class BlogContext(DbContextOptions<BlogContext> options) : DbContext(options)
    {
        public DbSet<Post> Posts { get; set; }
    }
}
