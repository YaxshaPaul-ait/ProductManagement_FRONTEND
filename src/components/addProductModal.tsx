import React, { useState } from 'react';
import { Box, Typography, Modal, TextField, Button, Input, Checkbox, FormControlLabel } from '@mui/material';
import { getApiEndPoint } from '../config/api';

interface Product {
  name: string;
  price: number | string;
  isAvailable: boolean;
  images: File[];
}

interface AddProductProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleClose: () => void;
}

const AddProduct = ({ open, setOpen, handleClose }: AddProductProps) => {
  const [product, setProduct] = useState<Product>({
    name: '',
    price: '',
    isAvailable: true,
    images: [],
  });

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price.toString());
      formData.append('isAvailable', product.isAvailable.toString());

      product.images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await fetch(getApiEndPoint('/products'), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      setOpen(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, name: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, price: e.target.value });
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, isAvailable: e.target.checked });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      if (product.images.length + newImages.length > 12) {
        alert('You can upload up to 12 images only.');
        return;
      }
      setProduct((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
    }
  };

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
        <Typography variant="h6" component="h2" sx={{ color: 'black' }}>
          Add Product
        </Typography>
        <TextField
          label="Name"
          value={product.name}
          onChange={handleNameChange}
          sx={{ mb: 2 }}
          fullWidth
          required
        />
        <TextField
          label="Price"
          value={product.price}
          onChange={handlePriceChange}
          type="number"
          sx={{ mb: 2 }}
          fullWidth
          required
        />
         <TextField
          label="Is Available"
          value={product.isAvailable}
          onChange={handleAvailabilityChange}
          sx={{ mb: 2 }}
          fullWidth
        />
        <Input
          type="file"
          multiple
          onChange={handleImageChange}
          sx={{ mb: 2 }}
          fullWidth
          accept="image/*"
        />
        {product.images.length > 0 && (
          <Typography variant="body2">
            {product.images.length} image(s) selected
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleAddProduct}
          sx={{
            backgroundColor: '#01615F',
          }}
          disabled={!product.name || !product.price}
        >
          Add Product
        </Button>
      </Box>
    </Modal>
  );
};

export default AddProduct;
