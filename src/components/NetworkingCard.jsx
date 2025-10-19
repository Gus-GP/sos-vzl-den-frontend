import { Card, CardContent, Typography, Chip, Box, CardActionArea } from '@mui/material';

function NetworkingCard({ title, topic, date, location, link }) {
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
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <CardContent sx={{ width: '100%' }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            {date}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            📍 {location}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {topic.split(',').map((t, idx) => (
              <Chip 
                key={idx} 
                label={t.trim()} 
                size="small" 
                color="primary" 
                variant="outlined" 
              />
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default NetworkingCard;
