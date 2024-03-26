import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import BlogPost, { BlogPostProps } from "./BlogPost";
import axios from "axios";

const defaultTheme = createTheme();

export default function MainPage() {
  const [posts, setPosts] = useState<BlogPostProps[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5285/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // TODO: add crud to post
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {<h1>.Net Blog</h1>}
        <main>
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
