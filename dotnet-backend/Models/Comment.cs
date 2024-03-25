namespace dot_net_blog.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using Microsoft.EntityFrameworkCore;
    using System.Text.Json.Serialization;

    public class Comment
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }

        [Required]
        public int PostId { get; set; }
        // TODO: maybe not required
        // nullable
        // [Required]
        [JsonIgnore]
        public Post? Post { get; set; }

        public Comment()
        {
            Username = "Anonymous";
            Content = string.Empty;
            CreatedAt = DateTime.Now;
            // TODO: maybe this will cause unexpected behavior
            // empty Post instance
            // to prevent nullable check?
            // Post = new Post();
        }
    }
}
