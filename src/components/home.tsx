import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import EditModal from './editProductModal';
import DeleteModal from './deleteProductModal';

function Home() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const products = [
    { name: 'water can', price: 13000, isAvailable: true },
    { name: 'mobile', price: 4000000, isAvailable: false },
    { name: 'phone', price: 3000, isAvailable: true },
  ];

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <TableContainer
        sx={{
          mt: 3,
          mb: 2,
          ml: 10,
          mr: 10,
          width: '65%',
          backgroundColor: '#fff',
          OverflowX: 'hidden',
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Is Available</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.name}>
                <TableCell sx={{ borderBottom: 'none' }}>
                  {product.name}
                </TableCell>
                <TableCell sx={{ borderBottom: 'none' }}>
                  {product.price}
                </TableCell>
                <TableCell sx={{ borderBottom: 'none' }}>
                  {product.isAvailable ? 'Yes' : 'No'}
                </TableCell>
                <TableCell sx={{ borderBottom: 'none' }}>
                  <TableCell sx={{ borderBottom: 'none' }}>
                    <EditIcon onClick={() => setOpenEdit(true)} />
                  </TableCell>
                </TableCell>
                <TableCell sx={{ borderBottom: 'none' }}>
                  <DeleteIcon onClick={() => setOpenDelete(true)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditModal openEdit={openEdit} setOpenEdit={setOpenEdit} />
      <DeleteModal openDelete={openDelete} setOpenDelete={setOpenDelete} />
    </Box>
  );
}

export default Home;
