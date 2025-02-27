import { useState } from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';

const AddProduct = ({ open, setOpen }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30vw',
          bgcolor: 'background.paper',
          border: '2px solid #fff',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Add Product
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="isAvailable"
          value={isAvailable}
          onChange={(e) => setIsAvailable(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            backgroundColor: '#01615F',
          }}
        >
          Add Product
        </Button>
      </Box>
    </Modal>
  );
};

export default AddProduct;
