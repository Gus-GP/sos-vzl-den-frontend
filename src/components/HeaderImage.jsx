import React from 'react';
import { Box } from '@mui/material';
import image from '../assets/websitebanner.jpeg';

function HeaderImage() {
  return (
    <Box sx={{ width: '100%', height: 'auto' }}>
      <img
        src={image}
        alt="Header Image"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
        }}
      />
    </Box>
  );
}

export default HeaderImage;
