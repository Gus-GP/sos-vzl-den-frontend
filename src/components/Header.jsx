// ...existing code...
// Header component placeholder
import { Box } from '@mui/material';
import HeaderToolbar from './HeaderToolbar';
import HeaderImage from './HeaderImage';

function Header() {
  return (
      <Box sx={{ position: 'relative', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: '0 0 16px 16px', overflow: 'hidden', background: '#fff' }}>
        <HeaderImage />
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
          <HeaderToolbar />
        </Box>
      </Box>
  );
}

export default Header;
