import axios from "axios";
import { useEffect, useState } from "react";
// ui
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// local
import BlogPost, { BlogPostProps } from "./BlogPost";
import CreatePostDialog from "./CreatePostDialog";

const defaultTheme = createTheme();

export default function MainPage() {
  const [posts, setPosts] = useState<BlogPostProps[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5285/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleSubmitNewPost = async (postContent: {
    title: string;
    content: string;
  }) => {
    try {
      const newPost = {
        ...postContent,
        createdAt: new Date().toISOString(),
      };

      await axios.post("http://localhost:5285/posts", newPost);

      fetchPosts();
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  // TODO: add crud to post
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {<h1>.Net Blog</h1>}
        <main>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
          >
            Add New Post
          </Button>

          <CreatePostDialog
            open={openDialog}
            onClose={handleCloseDialog}
            onSubmit={handleSubmitNewPost}
          />

          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <BlogPost
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  createdAt={post.createdAt}
                />
              </Grid>
            ))}
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}
