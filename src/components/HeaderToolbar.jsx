import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function HeaderToolbar() {
  return (
    <AppBar position="static" elevation={0} sx={{ background: 'rgba(255,255,255,0.95)', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
      <Toolbar sx={{ justifyContent: 'space-between', display: 'flex', minHeight: 64 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src="/sos-ven-den-fav.png" alt="Logo" style={{ height: 40, marginRight: 12 }} />
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              fontWeight: 'bold',
              textDecoration: 'none',
              color: '#2980b9',
              letterSpacing: 1,
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
            }}
          >
            SOS Venezuela Denver
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/projects"
            variant="outlined"
            sx={{
              color: '#2980b9',
              borderColor: '#2980b9',
              fontWeight: 600,
              borderRadius: 8,
              px: 2,
              '&:hover': { backgroundColor: '#e3f2fd', borderColor: '#1a6d9c' },
            }}
          >
            Projects
          </Button>
          <Button
            component={Link}
            to="/networkings"
            variant="outlined"
            sx={{
              color: '#2980b9',
              borderColor: '#2980b9',
              fontWeight: 600,
              borderRadius: 8,
              px: 2,
              '&:hover': { backgroundColor: '#e3f2fd', borderColor: '#1a6d9c' },
            }}
          >
            Networkings
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderToolbar;
