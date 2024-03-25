namespace dot_net_blog.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }

        public ICollection<Comment> Comments { get; set; }


        public Post()
        {
            Title = string.Empty;
            Content = string.Empty;
            CreatedAt = DateTime.Now;
            Comments = [];
        }
    }

}
