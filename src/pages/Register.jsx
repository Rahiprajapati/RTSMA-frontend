import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
        background: 'linear-gradient(to right, #f3e5f5, #e1bee7)',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4" align="center" gutterBottom color="primary">
          Create an Account
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
  <TextField
    required
    fullWidth
    id="username"
    label="Username"
    name="username"
    autoComplete="username"
    value={formData.username}
    onChange={handleChange}
    variant="outlined"
    margin="normal"
  />
  <TextField
    required
    fullWidth
    id="email"
    label="Email Address"
    name="email"
    autoComplete="email"
    value={formData.email}
    onChange={handleChange}
    variant="outlined"
    margin="normal"
  />
  <TextField
    required
    fullWidth
    name="password"
    label="Password"
    type="password"
    id="password"
    autoComplete="new-password"
    value={formData.password}
    onChange={handleChange}
    variant="outlined"
    margin="normal"
  />
  <TextField
    required
    fullWidth
    name="confirmPassword"
    label="Confirm Password"
    type="password"
    id="confirmPassword"
    value={formData.confirmPassword}
    onChange={handleChange}
    variant="outlined"
    margin="normal"
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
    {loading ? 'Registering...' : 'Register'}
  </Button>

  <Typography align="center" sx={{ mt: 3, fontSize: '0.95rem' }}>
    Already have an account?{' '}
    <Link to="/login" style={{ textDecoration: 'none', color: '#1E88E5', fontWeight: 500 }}>
      Login here
    </Link>
  </Typography>
</Box>

    </Paper>
  </Container>
);
}
export default Register;

