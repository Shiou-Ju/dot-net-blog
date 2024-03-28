import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { zhTW } from "date-fns/locale";
import { List, ListItem, ListItemText, Divider } from "@mui/material";

interface Comment {
  id: number;
  username: string;
  content: string;
  createdAt: string;
}

interface CommentsListProps {
  postId: number;
}

const formatDateToNow = (dateString: string) => {
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
    locale: zhTW,
  });
};

const CommentsList: React.FC<CommentsListProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(
        `http://localhost:5285/api/posts/${postId}/comments`
      );
      setComments(response.data);
    };

    fetchComments();
  }, [postId]);

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
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default CommentsList;
