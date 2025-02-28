import { useState, useEffect } from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';
import { getApiEndPoint } from '../config/api';

interface EditProductProps {
  openEdit: boolean;
  setOpenEdit: (open: boolean) => void;
  product: {
    _id: string;
    name: string;
    price: number;
    isAvailable: boolean;
  } | null;
}

const EditProduct = ({ openEdit, setOpenEdit, product }: EditProductProps) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setIsAvailable(product.isAvailable);
    }
  }, [product]);

  const handleClose = async () => {
    if (product) {
      try {
        const response = await fetch(
          getApiEndPoint(`/product/${product._id}`),
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, isAvailable }),
          }
        );
        if (response.ok) {
          setOpenEdit(false);
        } else {
          console.error('Failed to update product');
        }
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };

  return (
    <Modal open={openEdit} onClose={handleClose}>
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
        <Typography variant="h6" component="h2" sx={{ color: 'black' }}>
          Edit Product
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
          fullWidth
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          type="number"
          sx={{ mb: 2 }}
          fullWidth
        />
        <TextField
          label="Is Available"
          value={isAvailable ? 'Yes' : 'No'}
          onChange={(e) => setIsAvailable(e.target.value === 'Yes')}
          sx={{ mb: 2 }}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            backgroundColor: '#01615F',
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProduct;
