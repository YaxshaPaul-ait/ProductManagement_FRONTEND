import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getApiEndPoint } from '../config/api';

interface SignUpPageState {
  email: string;
  password: string;
  name: string;
  error: string | null;
}

function SignUp() {
  const [state, setState] = useState<SignUpPageState>({
    email: '',
    password: '',
    name: '',
    error: null,
  });
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setState({ ...state, error: null});
      const response = await axios.post(getApiEndPoint('/signup'), {
        name: state.name,
        email: state.email,
        password: state.password,
      });
      if (response.status === 201) {
        navigate('/home');
      } else {
        setState({ ...state, error: 'Invalid credentials'});
      }
    } catch (error: any) {
      setState({ ...state, error: error.message});
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
        {state.error && (
          <Typography variant="body2" sx={{ color: 'red', mb: 2 }}>
            {state.error}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleSignup}
          sx={{
            backgroundColor: '#01615F',
          }}
        >
          Create an account
        </Button>
      </Box>
    </Box>
  );
}

export default SignUp;