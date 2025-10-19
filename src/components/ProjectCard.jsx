import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

function ProjectCard({ title, description, date, link }) {
  const handleClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card sx={{
      width: 400,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 4,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 8px 32px rgba(41,128,185,0.3)',
        transform: 'translateY(-4px)',
        backgroundColor: '#e3f2fd',
      },
    }}>
      <CardActionArea 
        onClick={handleClick}
        disabled={!link}
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <CardContent sx={{ 
          width: '100%', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {date}
          </Typography>
          <Typography 
            variant="body1"
            sx={{
              overflow: 'visible',
              whiteSpace: 'normal',
              wordBreak: 'break-word'
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProjectCard;
