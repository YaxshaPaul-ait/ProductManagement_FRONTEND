import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      navigate('/home');
    } catch (error: any) {
      setError(error.message);
    }
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
        <Typography variant="h4" sx={{ mb: 2 }}>
          Login Page
        </Typography>
        <TextField
          label="Email_ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
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
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;
