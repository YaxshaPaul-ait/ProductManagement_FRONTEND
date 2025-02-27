import { Box, Typography, Modal, Button } from '@mui/material';

const DeleteModal = ({ openDelete, setOpenDelete }) => {
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
        <Typography variant="h6" component="h2">
          Delete Product
        </Typography>

        <Button
          variant="contained"
          onClick={handleClose}
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
    </Modal>
  );
};

export default DeleteModal;
