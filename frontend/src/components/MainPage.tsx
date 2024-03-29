import axios from "axios";
import { useEffect, useState } from "react";
// ui
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// local
import BlogPost, { SingleBlogPost } from "./BlogPost";
import CreatePostDialog from "./CreatePostDialog";
import EditPostDialog from "./EditPostDialog";

const defaultTheme = createTheme();

export default function MainPage() {
  const [posts, setPosts] = useState<SingleBlogPost[]>([]);
  const [openCreateDialog, setCreateOpenDialog] = useState(false);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingPost, setEditingPost] = useState<SingleBlogPost | null>(null);

  const handleOpenEditDialog = (post: SingleBlogPost) => {
    setEditingPost(post);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingPost(null);
  };

  const handleOpenConfirmDialog = (id: number) => {
    setSelectedPostId(id);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleOpenSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    // TODO: event type? why
    _event?: React.SyntheticEvent<unknown> | Event,
    reason?: string
  ) => {
    // TODO: why this?
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleOpenCreateDialog = () => {
    setCreateOpenDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateOpenDialog(false);
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
      handleCloseCreateDialog();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedPostId == null) return;

    try {
      await axios.delete(`http://localhost:5285/posts/${selectedPostId}`);
      handleOpenSnackbar("已成功刪除");

      const postsAfterDeletion = posts.filter(
        (post) => post.id !== selectedPostId
      );

      setPosts(postsAfterDeletion);
      handleCloseConfirmDialog();
    } catch (error) {
      console.error("無法成功刪除:", error);
      handleOpenSnackbar("無法成功刪除");
      handleCloseConfirmDialog();
    }
  };

  const handleEditPost = (id: number) => {
    const postToEdit = posts.find((post) => post.id === id);

    if (postToEdit) {
      handleOpenEditDialog(postToEdit);
    }
  };

  const handleSubmitEditPost = async (editedPost: SingleBlogPost) => {
    if (!editingPost) return;

    try {
      await axios.put(`http://localhost:5285/posts/${editingPost.id}`, {
        ...editedPost,
        id: editingPost.id,
      });

      fetchPosts();
      handleCloseEditDialog();
    } catch (error) {
      console.error("Failed to edit post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {<h1>.Net Blog</h1>}
        <main>
          {/* TODO: only shown when admin logs in */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenCreateDialog}
          >
            新增文章
          </Button>

          <CreatePostDialog
            open={openCreateDialog}
            onClose={handleCloseCreateDialog}
            onSubmit={handleSubmitNewPost}
          />

          <EditPostDialog
            open={openEditDialog}
            onClose={handleCloseEditDialog}
            onSubmit={handleSubmitEditPost}
            // TODO: not sure nullable
            initialPost={editingPost!}
          />

          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <BlogPost
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  createdAt={post.createdAt}
                  onDelete={() => handleOpenConfirmDialog(post.id)}
                  onEdit={() => handleEditPost(post.id)}
                />
              </Grid>
            ))}
          </Grid>
        </main>
      </Container>
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* TODO: to soft delete */}
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            你確定要刪除嗎？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>取消</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            確認
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
}
