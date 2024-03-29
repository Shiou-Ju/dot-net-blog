import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";

interface AddCommentFormProps {
  postId: number;
  onCommentAdded: () => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  postId,
  onCommentAdded,
}) => {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  // TODO: according to interface
  const [error, setError] = useState({ content: false, username: false });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const hasErrorFiled = !content.trim() || !username.trim();
    if (hasErrorFiled) {
      setError({
        content: !content.trim(),
        username: !username.trim(),
      });
      return;
    }

    setError({ content: false, username: false });
    await axios.post(`http://localhost:5285/api/posts/${postId}/comments`, {
      username,
      content,
    });

    setContent("");
    setUsername("");
    onCommentAdded();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="用戶"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={error.username}
        helperText={error.username ? "用戶名為必填" : ""}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="評論"
        name="comment"
        autoFocus
        value={content}
        onChange={(e) => setContent(e.target.value)}
        error={error.content}
        helperText={error.content ? "評論為必填" : ""}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        提交評論
      </Button>
    </Box>
  );
};

export default AddCommentForm;
