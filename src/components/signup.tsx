import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    navigate('/home');
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
          Create an Account
        </Typography>
        <TextField
          label="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Email_ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        {/* {error && (
          <Typography variant="body2" sx={{ color: 'red', mb: 2 }}>
            {error}
          </Typography>
        )} */}
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
