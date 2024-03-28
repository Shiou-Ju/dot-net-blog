import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box } from '@mui/material';

interface AddCommentFormProps {
  postId: number;
  onCommentAdded: () => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!content.trim()) return;

    await axios.post(`http://localhost:5285/api/posts/${postId}/comments`, { content });
    setContent('');
    onCommentAdded();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="評論"
        name="comment"
        autoFocus
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        提交評論
      </Button>
    </Box>
  );
};

export default AddCommentForm;
