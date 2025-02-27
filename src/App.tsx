import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import AddProduct from './components/addProductModal';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
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
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
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
              <Signup />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Product_Management
                  </Typography>
                  <Button color="inherit" onClick={() => setOpen(true)}>
                    Add Product
                  </Button>
                  <Button color="inherit" onClick={() => setOpen(true)}>
                    Filter
                  </Button>
                  <AddProduct open={open} setOpen={setOpen} />
                </Toolbar>
              </AppBar>
              <Home />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
