import { AppBar, Toolbar, Typography } from '@mui/material';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Countdown Board
      </Typography>
      <Typography variant="h6" style={{ marginRight: 50 }}>
        <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
          Home
        </Link>
      </Typography>
      <Typography variant="h6" style={{ marginRight: 50 }}>
        <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
          About
        </Link>
      </Typography>
      <LogoutButton />
    </Toolbar>
  </AppBar>
);

export default Navbar;
