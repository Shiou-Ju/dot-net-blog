import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { zhTW } from "date-fns/locale";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export interface Comment {
  id: number;
  username: string;
  content: string;
  createdAt: string;
}

interface CommentsListProps {
  postId: number;
  refresh: boolean;
}

const formatDateToNow = (dateString: string) => {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
    locale: zhTW,
  });
};

const CommentsList: React.FC<CommentsListProps> = ({ postId, refresh }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(
    null
  );

  const handleDeleteClick = (commentId: number) => {
    setDeletingCommentId(commentId);
    setOpenConfirmDialog(true);
  };

  // TODO: use call back?
  const fetchComments = useCallback(async () => {
    const response = await axios.get(
      `http://localhost:5285/api/posts/${postId}/comments`
    );
    setComments(response.data);
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, postId, refresh]);

  const handleEdit = () => {
    // TODO:
  };

  const handleConfirmDelete = async () => {
    if (deletingCommentId === null) return;

    try {
      await axios.delete(
        `http://localhost:5285/api/posts/${postId}/comments/${deletingCommentId}`
      );

      setComments((currentComments) =>
        currentComments.filter((comment) => comment.id !== deletingCommentId)
      );

      setSnackbarMessage("成功刪除評論");
      setOpenSnackbar(true);

      setOpenConfirmDialog(false);
    } catch (error) {
      console.error("Failed to delete comment:", error);
      setSnackbarMessage("刪除評論失敗");
      setOpenSnackbar(true);
    }

    setDeletingCommentId(null);
  };

  return (
    <List>
      {comments.map((comment) => (
        <React.Fragment key={comment.id}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={comment.content}
              secondary={
                <>
                  <br />
                  {"用戶：" + comment.username} <br />
                  {"發佈於：" + formatDateToNow(comment.createdAt)}
                </>
              }
            />
            <>
              <IconButton
                edge="end"
                aria-label="edit"
                // TODO:
                onClick={() => handleEdit()}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteClick(comment.id)}
              >
                <DeleteIcon />
              </IconButton>
            </>
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"確認刪除"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            確定要刪除評論嗎？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>取消</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
};

export default CommentsList;
