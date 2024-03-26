import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

export interface BlogPostProps {
  id: number; 
  title: string;
  content: string;
  createdAt: string; 
}

// TODO: not ready
const BlogPost: React.FC<BlogPostProps> = ({ title, content, createdAt }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card sx={{ margin: '2rem 0' }}>
      <CardHeader
        title={title}
        subheader={`發佈於：${formatDate(createdAt)}`} 
      />
      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogPost;
