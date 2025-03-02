import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';
import { updateProduct } from '../config/actions';
import { RootState } from '../config/store';
import React from 'react';

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
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const { loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setIsAvailable(product.isAvailable);
    }
  }, [product]);

  const handleUpdate = async () => {
    if (!product) return;

    dispatch(updateProduct({ 
      id: product._id, 
      name, 
      price, 
      isAvailable 
    })as any)
    .unwrap()
    .then(() => {
      setOpenEdit(false);
    })
    .catch((err: string) => {
      console.error('Update failed:', err);
    });
  };

  return (
    <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
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
        {error && <Typography color="error">{error}</Typography>}
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
          onClick={handleUpdate}
          disabled={loading}
          sx={{ backgroundColor: '#01615F' }}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProduct;
