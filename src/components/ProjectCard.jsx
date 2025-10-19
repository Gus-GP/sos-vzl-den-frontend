import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { logEvent } from '../utils/analytics';

function ProjectCard({ title, description, date, link }) {
  const handleClick = () => {
    if (link) {
      logEvent('Project Card', 'Click', title);
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card sx={{
      width: '100%',
      maxWidth: { xs: '100%', sm: 400 },
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
          padding: { xs: 1, sm: 2 },
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
          gap: 2,
          p: { xs: 2, sm: 3 }
        }}>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="h2"
            sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            color="textSecondary"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            {date}
          </Typography>
          <Typography 
            variant="body1"
            sx={{
              overflow: 'visible',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              fontSize: { xs: '0.9rem', sm: '1rem' }
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
