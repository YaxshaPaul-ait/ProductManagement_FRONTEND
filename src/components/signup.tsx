import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../config/store';
import { signUp } from '../config/actions';
import React from 'react';

interface SignUpPageState {
  email: string;
  password: string;
  name: string;
}

function SignUp() {
  const [state, setState] = useState<SignUpPageState>({
    email: '',
    password: '',
    name: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSignup = async () => {
    try {
      const resultAction = await dispatch(signUp(state));

      if (signUp.fulfilled.match(resultAction)) {
        navigate('/home');
      }
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  const handleInputChange = (field: keyof SignUpPageState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [field]: e.target.value });
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
          Create an Account
        </Typography>
        <TextField
          label="Username"
          value={state.name}
          onChange={handleInputChange('name')}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Email_ID"
          value={state.email}
          onChange={handleInputChange('email')}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={state.password}
          onChange={handleInputChange('password')}
          sx={{ mb: 2 }}
          required
        />
        {loading && <Typography>Signing up...</Typography>}
        {error && (
          <Typography variant="body2" sx={{ color: 'red', mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleSignup}
          sx={{ backgroundColor: '#01615F' }}
          disabled={loading}
        >
          Create an account
        </Button>
      </Box>
    </Box>
  );
}

export default SignUp;
