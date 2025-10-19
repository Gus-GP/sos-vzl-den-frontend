import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

function HeaderToolbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Projects', path: '/projects' },
    { text: 'Networkings', path: '/networkings' }
  ];

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  sx: { color: '#2980b9', fontWeight: 600, fontSize: '1.1rem' } 
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" elevation={0} sx={{ background: 'rgba(255,255,255,0.95)', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
      <Toolbar sx={{ justifyContent: 'space-between', display: 'flex', minHeight: { xs: 56, sm: 64 }, px: { xs: 1, sm: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <img 
            src="/sos-ven-den-fav.png" 
            alt="Logo" 
            style={{ 
              height: isMobile ? 32 : 40, 
              marginRight: isMobile ? 4 : 12 
            }} 
          />
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="a"
            href="/"
            sx={{
              fontWeight: 'bold',
              textDecoration: 'none',
              color: '#2980b9',
              letterSpacing: { xs: 0, sm: 1 },
              fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
              fontSize: { xs: '0.9rem', sm: '1.25rem', md: '1.5rem' },
            }}
          >
            {isMobile ? 'SOS VEN DEN' : 'SOS Venezuela Denver'}
          </Typography>
        </Box>
        
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ color: '#2980b9' }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerContent}
            </Drawer>
          </>
        ) : (
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
        )}
      </Toolbar>
    </AppBar>
  );
}

export default HeaderToolbar;
