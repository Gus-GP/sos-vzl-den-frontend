import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#222',
        color: '#fff',
        padding: '32px 0 16px 0',
        marginTop: 'auto',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ minWidth: 220, mb: { xs: 2, md: 0 } }}>
            <Typography variant="h6" gutterBottom color='white'>SOS Venezuela Denver</Typography>
            <Typography variant="body2" color="grey.300">
              A community-driven organization dedicated to supporting Venezuela.
            </Typography>
          </Box>
          <Box sx={{ minWidth: 180 }}>
            <Typography variant="h6" gutterBottom color='white'>Quick Links</Typography>
            <Link href="/" underline="none" color="inherit" sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
              Home
            </Link>
            <Link href="/projects" underline="none" color="inherit" sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
              Projects
            </Link>
            <Link href="/networkings" underline="none" color="inherit" sx={{ display: 'block', fontWeight: 500 }}>
              Networkings
            </Link>
          </Box>
          <Box sx={{ minWidth: 240 }}>
            <Typography variant="h6" gutterBottom color='white'>Contact Us</Typography>
            <Typography variant="body2" color="grey.300" sx={{ mb: 1 }}>
              <EmailIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
              Email: <a href="mailto:sosvzladenver@gmail.com" style={{ color: '#90caf9', textDecoration: 'none' }}>sosvzladenver@gmail.com</a>
            </Typography>
            <Typography variant="body2" color="grey.300" sx={{ mb: 1 }}>
              <LanguageIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
              Website: <a href="https://sosvenezueladenver.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#90caf9', textDecoration: 'none' }}>sosvenezueladenver.org</a>
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton 
                component="a" 
                href="https://www.facebook.com/groups/SOSVenezuelaDenver" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ color: '#90caf9', '&:hover': { color: '#64b5f6' } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://www.instagram.com/sosvzladenver/" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ color: '#90caf9', '&:hover': { color: '#64b5f6' } }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box sx={{ borderTop: '1px solid #444', pt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="grey.400">
            &copy; {new Date().getFullYear()} SOS Venezuela Denver. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
