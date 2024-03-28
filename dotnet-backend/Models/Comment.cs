// TODO: implement DTO
namespace dot_net_blog.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using Microsoft.EntityFrameworkCore;
    using System.Text.Json.Serialization;

    public class Comment
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
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
            // TODO: maybe use oauth for user to add new comment
            // and save auth here
            Username = "Anonymous";
            Content = string.Empty;
            CreatedAt = DateTime.UtcNow;
            // TODO: maybe this will cause unexpected behavior
            // empty Post instance
            // to prevent nullable check?
            // Post = new Post();
        }
    }
}
