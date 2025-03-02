import React,{ useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, TextField } from "@mui/material";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";
import AddProduct from "./components/addProductModal";

function App() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [showAvailable, setShowAvailable] = useState(false);
  const [date, setDate] = useState(""); 
  const [name, setName] = useState("");

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
                  <Button
                    color="inherit"
                    onClick={() => setShowAvailable(true)}
                  >
                    Available
                  </Button>
                  <AddProduct
                    open={open}
                    setOpen={setOpen}
                    handleClose={handleClose}
                  />
                  
                  <TextField
                    label="Date"
                    placeholder="DD-MM-YYYY"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    sx={{ width: 200, marginRight: 2 }}
                  />

                  <TextField
                    id="name"
                    label="Name"
                    variant="standard"
                    sx={{ width: 200, marginRight: 2 }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Toolbar>
              </AppBar>
              <Home showAvailable={showAvailable} name={name} date={date} />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
