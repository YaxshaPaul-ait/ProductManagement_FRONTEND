import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getApiEndPoint } from '../config/api';

interface LoginPageState {
  email: string;
  password: string;
  error: string | null;
}

function LoginPage() {
  const [state, setState] = useState<LoginPageState>({
    email: '',
    password: '',
    error: null,
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setState({ ...state });
      const response = await axios.post(getApiEndPoint('/login'), {
        email: state.email,
        password: state.password,
      });
      if (response.status === 200) {
        navigate('/home');
      } else {
        setState({ ...state, error: 'Invalid credentials' });
      }
    } catch (error) {
      setState({ ...state, error: error.message });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, color: 'black' }}>
          Login Page
        </Typography>
        <TextField
          label="Email_ID"
          name="email"
          value={state.email}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={state.password}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        {state.error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {state.error}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            backgroundColor: '#01615F',
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;
