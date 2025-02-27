import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface CreatePostDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (post: { title: string; content: string }) => Promise<void>;
}

export default function CreatePostDialog({
  open,
  onClose,
  onSubmit,
}: CreatePostDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    await onSubmit({ title, content });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>新增文章</DialogTitle>
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
