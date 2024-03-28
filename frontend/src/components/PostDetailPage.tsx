// css
import './PostDetailPage.css'
// pkg
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleBlogPost } from "./BlogPost";
import { Box, CircularProgress, Container, Typography } from "@mui/material";

const PostDetailPage: React.FC = () => {
  let { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<SingleBlogPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const result = await axios.get(`http://localhost:5285/posts/${id}`);
      setPost(result.data);
    };

    fetchPost();
  }, [id]);

  return (
    <Container>
      {post ? (
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body1" className="preserve-whitespace">
            {post.content}
          </Typography>
          {/* TODO: comments */}
        </Box>
      ) : (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};
export default PostDetailPage;
