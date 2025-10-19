import { Container, Typography, Box, Divider } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: { xs: 3, md: 6 }, px: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700, 
            letterSpacing: 1, 
            color: '#2980b9', 
            fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Welcome!
        </Typography>
        <Typography 
          variant="h3" 
          sx={{ 
            mb: 2, 
            fontWeight: 600, 
            color: '#34495e',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}
        >
          SOS Venezuela-Denver - 501c(3)
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            mb: 2, 
            fontWeight: 400,
            fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
            px: { xs: 1, md: 0 }
          }}
        >
          We are a Non Profit Organization with 501c3 Status, located in Denver, Colorado.
        </Typography>
      </Box>

      <Divider sx={{ my: { xs: 3, md: 4 }, borderColor: '#2980b9', borderWidth: 1 }} />

      {/* Mission Section */}
      <Box sx={{ mb: { xs: 4, md: 5 }, textAlign: 'left', px: { xs: 1, md: 0 } }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            color: '#2980b9', 
            mb: 2,
            textAlign: 'center',
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
          }}
        >
          Mission
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            color: '#444', 
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.15rem' },
            lineHeight: 1.7,
            textAlign: 'center'
          }}
        >
          Our mission is to promote Venezuela and Hispanic's culture, and support those adversely impacted by the economic and humanitarian crisis.
        </Typography>
      </Box>

      <Divider sx={{ my: { xs: 3, md: 4 } }} />

      {/* Vision Section */}
      <Box sx={{ mb: { xs: 4, md: 5 }, textAlign: 'left', px: { xs: 1, md: 0 } }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            color: '#2980b9', 
            mb: 2,
            textAlign: 'center',
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
          }}
        >
          Vision
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            color: '#444', 
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.15rem' },
            lineHeight: 1.7,
            textAlign: 'center'
          }}
        >
          Be an organization recognized for its values of commitment and solidarity with those Venezuelans and Hispanics in need.
        </Typography>
      </Box>

      <Divider sx={{ my: { xs: 3, md: 4 } }} />

      {/* How Section */}
      <Box sx={{ mb: { xs: 4, md: 5 }, textAlign: 'left', px: { xs: 1, md: 0 } }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            color: '#2980b9', 
            mb: 2,
            textAlign: 'center',
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
          }}
        >
          How
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            color: '#444', 
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.15rem' },
            lineHeight: 1.7,
            textAlign: 'center'
          }}
        >
          Through the Venezuelan festival, informational forums, fundraising and partnership with causes in Venezuela that offer humanitarian help, by offering humanitarian help when other countries in Latin America are also in need, and mobilizing the Venezuelan community in Colorado as needed.
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
