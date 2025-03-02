import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../config/store';
import { login } from '../config/actions';
import React from 'react';

interface LoginPageState {
  email: string;
  password: string;
}

function LoginPage() {
  const [state, setState] = useState<LoginPageState>({
    email: '',
    password: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    try {
      const resultAction = await dispatch(login({ email: state.email, password: state.password }));

      if (login.fulfilled.match(resultAction)) {
        navigate('/home');
      }
    } catch (err) {
      console.error('Login failed:', err);
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
        {loading && <Typography>Logging in...</Typography>}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            backgroundColor: '#01615F',
          }}
          disabled={loading}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;
