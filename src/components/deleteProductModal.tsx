import { Box, Typography, Modal, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../config/store";
import { deleteProduct } from "../config/actions";
import React from 'react';

interface DeleteModalProps {
  openDelete: boolean;
  setOpenDelete: (open: boolean) => void;
  product: {
    _id: string;
    name: string;
    price: number;
    isAvailable: boolean;
  } | null;
}

const DeleteModal = ({ openDelete, setOpenDelete, product }: DeleteModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {  error } = useSelector((state: RootState) => state.products);

  const handleDelete = async () => {
    if (!product || !product._id) {
      console.error("Product ID is missing");
      return;
    }

    try {
      await dispatch(deleteProduct(product._id)).unwrap();
      setOpenDelete(false);
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleClose = () => setOpenDelete(false);

  return (
    <Modal open={openDelete} onClose={handleClose}>
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
          Delete Product
        </Typography>
        <Typography component="h2" sx={{ color: 'black' }}>
          Are you sure you want to delete {product?.name}?
        </Typography>

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mt: 2,
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={handleDelete}
            sx={{ backgroundColor: '#01615F' }}
          >
         Delete
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ backgroundColor: '#01615F' }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
