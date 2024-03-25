using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dot_net_blog.Data;
using dot_net_blog.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dot_net_blog.Controllers
{
    [ApiController]
    [Route("api/posts/{postId}/comments")]
    public class CommentsController : ControllerBase
    {
        private readonly BlogContext _context;

        public CommentsController(BlogContext context)
        {
            _context = context;
        }

        // GET: api/posts/{postId}/comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments(int postId)
        {
            if (!PostExists(postId))
            {
                return NotFound();
            }

            return await _context.Comments
                                 .Where(c => c.PostId == postId)
                                 .ToListAsync();
        }

        // POST: api/posts/{postId}/comments
        [HttpPost]
        public async Task<ActionResult<Comment>> CreateComment(int postId, Comment comment)
        {
            if (!PostExists(postId))
            {
                return NotFound();
            }

            comment.PostId = postId;
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetComment), new { postId = comment.PostId, id = comment.Id }, comment);

        }

        // GET: api/posts/{postId}/comments/{id}
        // [HttpGet("{postId:int}/comments/{id:int}")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(int postId, int id)
        {
            var comment = await _context.Comments
                                  .Where(c => c.Id == id && c.PostId == postId)
                                  .FirstOrDefaultAsync();

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        private bool PostExists(int postId)
        {
            return _context.Posts.Any(e => e.Id == postId);
        }

        // PUT: api/posts/{postId}/comments/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment(int postId, int id, Comment comment)
        {
            if (id != comment.Id || postId != comment.PostId)
            {
                return BadRequest();
            }

            if (!PostExists(postId))
            {
                return NotFound(new { message = "Post not found." });
            }

            if (!_context.Comments.Any(c => c.Id == id))
            {
                return NotFound(new { message = "Comment not found." });
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }

        // DELETE: api/posts/{postId}/comments/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int postId, int id)
        {
            var comment = await _context.Comments.Where(c => c.PostId == postId && c.Id == id).FirstOrDefaultAsync();

            if (comment == null)
            {
                return NotFound(new { message = "Comment not found." });
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
