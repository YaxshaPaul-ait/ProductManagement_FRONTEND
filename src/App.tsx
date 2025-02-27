import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Login from './components/login';
import Signup from './components/signup';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Product_Management
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Create an account
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
