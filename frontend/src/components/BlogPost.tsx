import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

export interface SingleBlogPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

type BlogPostProps = SingleBlogPost & {
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

const BlogPost: React.FC<BlogPostProps> = ({
  id,
  title,
  content,
  createdAt,
  onDelete,
  onEdit,
}) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    onEdit(id);
  };

  return (
    <Card sx={{ margin: "2rem 0" }}>
      <CardHeader
        title={title}
        subheader={`發佈於：${formatDate(createdAt)}`}
      />
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleEdit}>
          編輯
        </Button>
        <Button size="small" color="secondary" onClick={handleDelete}>
          刪除
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlogPost;
