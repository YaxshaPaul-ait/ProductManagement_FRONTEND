import { Box, Typography, Modal, Button } from '@mui/material';
import { getApiEndPoint } from '../config/api';

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

const DeleteModal = ({
  openDelete,
  setOpenDelete,
  product,
}: DeleteModalProps) => {
  const handleDelete = async () => {
    if (product) {
      try {
        const response = await fetch(
          getApiEndPoint(`/product/${product._id}`),
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.ok) {
          setOpenDelete(false);
        } else {
          console.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    } else {
      console.error('onDeleteSuccess is not a function or product is null');
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
          Are You sure to delete {product?.name}?
        </Typography>

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
            sx={{
              backgroundColor: '#01615F',
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              backgroundColor: '#01615F',
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
