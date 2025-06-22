import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const result = await login(formData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <Box
  //     sx={{
  //       minHeight: '100vh',
  //       background: 'linear-gradient(to right, #1E88E5, #42A5F5)',
  //       display: 'flex',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       py: 6
  //     }}
  //   >
  //     <Container maxWidth="xs">
  //       <Paper
  //         elevation={6}
  //         sx={{
  //           p: 4,
  //           borderRadius: 3,
  //           backgroundColor: 'white',
  //           boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
  //         }}
  //       >
  //         <Box display="flex" flexDirection="column" alignItems="center">
  //           <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
  //             <LockOutlinedIcon />
  //           </Avatar>
  //           <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
  //             Sign In
  //           </Typography>
  //         </Box>

  //         {error && (
  //           <Alert severity="error" sx={{ mt: 2 }}>
  //             {error}
  //           </Alert>
  //         )}

  //         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
  //           <TextField
  //             margin="normal"
  //             fullWidth
  //             required
  //             id="email"
  //             label="Email Address"
  //             name="email"
  //             autoComplete="email"
  //             autoFocus
  //             value={formData.email}
  //             onChange={handleChange}
  //           />
  //           <TextField
  //             margin="normal"
  //             fullWidth
  //             required
  //             name="password"
  //             label="Password"
  //             type="password"
  //             id="password"
  //             autoComplete="current-password"
  //             value={formData.password}
  //             onChange={handleChange}
  //           />

  //           <Button
  //             type="submit"
  //             fullWidth
  //             variant="contained"
  //             color="primary"
  //             sx={{
  //               mt: 3,
  //               mb: 2,
  //               py: 1.2,
  //               fontWeight: 'bold',
  //               textTransform: 'uppercase'
  //             }}
  //             disabled={loading}
  //           >
  //             {loading ? 'Signing In...' : 'Sign In'}
  //           </Button>

  //           <Grid container justifyContent="center">
  //             <Grid item>
  //               <Typography variant="body2">
  //                 Don&apos;t have an account?{' '}
  //                 <Link to="/register" style={{ textDecoration: 'none', color: '#1E88E5', fontWeight: 500 }}>
  //                   Sign Up
  //                 </Link>
  //               </Typography>
  //             </Grid>
  //           </Grid>
  //         </Box>
  //       </Paper>
  //     </Container>
  //   </Box>
  // );



  return (
  <Container
    maxWidth="sm"
    sx={{
      mt: 10,
      mb: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Paper
      elevation={6}
      sx={{
        p: { xs: 4, sm: 6 },
        width: '100%',
        borderRadius: '20px',
        background: 'linear-gradient(to right, #e3f2fd, #bbdefb)',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Login
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <TextField
          margin="normal"
          fullWidth
          required
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          required
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            py: 1.2,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Login'}
        </Button>

        <Typography align="center" sx={{ mt: 3, fontSize: '0.95rem' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#1E88E5', fontWeight: 500 }}>
            Register here
          </Link>
        </Typography>
      </Box>
    </Paper>
  </Container>
);


};

export default Login;




// ///////////////////////////////
// import {
//   Box,
//   Button,
//   Container,
//   Paper,
//   TextField,
//   Typography,
// } from '@mui/material';

// const Login = () => {
  // return (
  //   <Container
  //     maxWidth="sm"
  //     sx={{
  //       mt: 10,
  //       mb: 10,
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //     }}
  //   >
  //     <Paper
  //       elevation={6}
  //       sx={{
  //         p: { xs: 4, sm: 6 },
  //         width: '100%',
  //         borderRadius: '20px',
  //         background: 'linear-gradient(to right, #e3f2fd, #bbdefb)',
  //       }}
  //     >
  //       <Typography variant="h4" align="center" gutterBottom color="primary">
  //         Login
  //       </Typography>

  //       <Box component="form" sx={{ mt: 4 }}>
  //         <TextField
  //           label="Email"
  //           fullWidth
  //           required
  //           type="email"
  //           margin="normal"
  //           variant="outlined"
  //         />
  //         <TextField
  //           label="Password"
  //           fullWidth
  //           required
  //           type="password"
  //           margin="normal"
  //           variant="outlined"
  //         />

  //         <Button
  //           variant="contained"
  //           color="primary"
  //           fullWidth
  //           sx={{ mt: 3, py: 1.2, fontWeight: 'bold' }}
  //         >
  //           Login
  //         </Button>
  //       </Box>

  //       <Typography align="center" sx={{ mt: 3, fontSize: '0.95rem' }}>
  //         Don't have an account? <a href="/register">Register here</a>
  //       </Typography>
  //     </Paper>
  //   </Container>
  // );
// };

// export default Login;
