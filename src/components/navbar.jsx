import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; // 🔄 Updated icon
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logo from '../assets/LOGO2.png'; // 👈 adjust path based on your folder structure
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenu = (event) => setMobileMenuAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#0D1B2A', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RouterLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={logo} alt="StockAnalyzer Logo" style={{ height: 40, marginRight: 10 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                fontSize: '1.6rem',
                letterSpacing: 1,
                color: '#FF6F61'
              }}
            >
              StockAnalyzer
            </Typography>
          </RouterLink>

          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenu}
                sx={{ ml: 'auto' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchorEl}
                open={Boolean(mobileMenuAnchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem component={RouterLink} to="/" onClick={handleClose}>Home</MenuItem>
                {isAuthenticated ? (
                  <>
                    <MenuItem component={RouterLink} to="/dashboard" onClick={handleClose}>Dashboard</MenuItem>
                    <MenuItem component={RouterLink} to="/portfolio" onClick={handleClose}>Portfolio</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem component={RouterLink} to="/login" onClick={handleClose}>Login</MenuItem>
                    <MenuItem component={RouterLink} to="/register" onClick={handleClose}>Register</MenuItem>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: 'flex', ml: 3 }}>
              <Button component={RouterLink} to="/" sx={navButtonStyle}>Home</Button>
              {isAuthenticated && (
                <>
                  <Button component={RouterLink} to="/dashboard" sx={navButtonStyle}>Dashboard</Button>
                  <Button component={RouterLink} to="/portfolio" sx={navButtonStyle}>Portfolio</Button>
                </>
              )}
            </Box>
          )}

          <Box>
            {isAuthenticated ? (
              <>
                <IconButton onClick={handleMenu} color="inherit">
                  <PersonOutlineIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex' }}>
                <Button component={RouterLink} to="/login" sx={navButtonStyle}>Login</Button>
                <Button component={RouterLink} to="/register" sx={navButtonStyle}>Register</Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const navButtonStyle = {
  my: 1,
  color: '#cfd8dc',
  mx: 1.5,
  fontWeight: '500',
  fontSize: '0.95rem',
  '&:hover': {
    color: '#1E88E5',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '6px',
  },
};

export default Navbar;
