import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { SingleBlogPost } from "./BlogPost";

interface EditPostDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (post: SingleBlogPost) => Promise<void>;
  initialPost?: SingleBlogPost;
}

export default function EditPostDialog({
  open,
  onClose,
  onSubmit,
  initialPost,
}: EditPostDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState<number | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  const resetFields = () => {
    setTitle("");
    setContent("");
    setId(null);
    setCreatedAt(null);
  };

  const handleSubmit = async () => {
    if (!id || !createdAt) {
      console.error("no id or createdAt");
      return;
    }

    await onSubmit({ title, content, id, createdAt });

    resetFields();
  };

  useEffect(() => {
    if (initialPost) {
      setTitle(initialPost.title);
      setContent(initialPost.content);
      setId(initialPost.id);
      setCreatedAt(initialPost.createdAt);
    } else {
      resetFields();
    }
  }, [initialPost]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>修改文章</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="標題"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="內容"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <Button onClick={handleSubmit}>發佈</Button>
      </DialogActions>
    </Dialog>
  );
}
