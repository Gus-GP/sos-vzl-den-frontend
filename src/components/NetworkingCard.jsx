import { Card, CardContent, Typography, Chip, Box, CardActionArea } from '@mui/material';
import { logEvent } from '../utils/analytics';

function NetworkingCard({ title, topic, date, location, link }) {
  const handleClick = () => {
    if (link) {
      logEvent('Networking Card', 'Click', `${title} - ${location}`);
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  // Safely handle topic to prevent undefined errors
  const topicString = topic || '';
  const topicArray = topicString ? topicString.split(',').filter(t => t.trim()) : [];

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
          justifyContent: 'flex-start',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <CardContent sx={{ 
          width: '100%', 
          p: { xs: 2, sm: 3 },
          textAlign: 'center'
        }}>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="h2"
            sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              width: '100%'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="body2" 
            color="textSecondary" 
            sx={{ 
              mb: 1, 
              fontSize: { xs: '0.875rem', sm: '1rem' },
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              width: '100%'
            }}
          >
            {date}
          </Typography>
          <Typography 
            variant="body2" 
            color="textSecondary" 
            sx={{ 
              mb: 2, 
              fontSize: { xs: '0.875rem', sm: '1rem' },
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              width: '100%'
            }}
          >
            📍 {location}
          </Typography>
          {topicArray.length > 0 && (
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1,
              justifyContent: 'center'
            }}>
              {topicArray.map((t, idx) => (
                <Chip 
                  key={idx} 
                  label={t.trim()} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                  sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
                />
              ))}
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default NetworkingCard;
