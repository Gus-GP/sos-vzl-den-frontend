import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import DenverMap from '../components/DenverMap';
import NetworkingCard from '../components/NetworkingCard';
import Papa from 'papaparse';

function Networkings() {
  const [networkingEvents, setNetworkingEvents] = useState([]);

  useEffect(() => {
    fetch('/SOS_Ven_Den_Networkings_2025.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim(),
          complete: (results) => {
            const formattedEvents = results.data
              .filter(row => row.Title)
              .map(row => {
                let coords = [-104.9903, 39.7392]; // Default to Denver center
                if (row.Coordinates) {
                  try {
                    coords = JSON.parse(row.Coordinates.trim());
                  } catch (e) {
                    console.error('Error parsing coordinates for:', row.Title, e);
                  }
                }

                return {
                  title: row.Title || 'Untitled Event',
                  topic: row.Topic || '',
                  date: row.Date || '',
                  location: row.Location || '',
                  coordinates: coords,
                  link: row.Link || '',
                };
              });
            setNetworkingEvents(formattedEvents);
          },
        });
      })
      .catch(error => console.error('Error loading CSV:', error));
  }, []);

  return (
    <>
      {/* Map Section */}
      <Box sx={{ width: '100%', mb: 6, mt: 4 }}>
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            mb: 3,
            fontWeight: 600,
            color: 'primary.main'
          }}
        >
          Networking Events Across Denver Metro Area
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ 
            mb: 4,
            maxWidth: '800px',
            mx: 'auto',
            px: 2,
            color: 'text.secondary'
          }}
        >
          Join us at our networking events throughout the Denver metropolitan area. Click on any marker to see event details and topics.
        </Typography>
        <DenverMap networkingEvents={networkingEvents} />
      </Box>
      
      {/* Event Cards Section */}
      <Box sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            mb: 2,
            fontWeight: 600,
            color: 'primary.main'
          }}
        >
          Networking Events
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ 
            mb: 5,
            maxWidth: '800px',
            mx: 'auto',
            color: 'text.secondary'
          }}
        >
          Connect with professionals and community members at our educational networking events covering various topics.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {networkingEvents.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <NetworkingCard
                title={event.title}
                topic={event.topic}
                date={event.date}
                location={event.location}
                link={event.link}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Networkings;
