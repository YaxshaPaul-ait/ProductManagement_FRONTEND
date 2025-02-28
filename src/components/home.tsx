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
import { useState, useEffect } from 'react';
import EditModal from './editProductModal';
import DeleteModal from './deleteProductModal';
import { getApiEndPoint } from '../config/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  isAvailable: boolean;
}

interface ProductProps {
  showAvailable: boolean;
  name: string;
  date: string;
}

interface ApiResponse {
  message: string;
  data: Product[];
}

function Home({ showAvailable, name, date }: ProductProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [showAvailableProducts, setShowAvailableProducts] = useState(false);

  const handleEditClick = (product: Product) => {
    setOpenEdit(true);
    setSelectedProduct(product);
  };

  const handleAvailableClick = () => {
    setShowAvailableProducts(true);
    fetchAvailableProducts();
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(getApiEndPoint('/products'));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchAvailableProducts = async () => {
    try {
      const response = await fetch(
        getApiEndPoint('/product_stock/?isAvailable=true')
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      setAvailableProducts(
        data.data?.filter((product) => product.isAvailable) || []
      );
    } catch (error) {
      console.error('Error fetching available products:', error);
    }
  };

  const fetchProductsByName = async (name: string) => {
    try {
      const response = await fetch(
        getApiEndPoint(`/products_name/?name=${name}`)
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      setAvailableProducts(data.data);
    } catch (error) {
      console.error('Error fetching products by name:', error);
    }
  };

  const fetchProductsByDate = async (date: string) => {
    try {
      if (!date) return;
      console.log(date);

      const response = await fetch(
        getApiEndPoint(`/products_date/?date=${date}`)
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      setAvailableProducts(data.data);
    } catch (error) {
      console.error('Error fetching products by date:', error);
    }
  };

  useEffect(() => {
    if (date) {
      const formattedDate = date.split('-').reverse().join('-');
      fetchProductsByDate(formattedDate);
    }
  }, [date]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (name) {
      fetchProductsByName(name);
    }
  }, [name]);

  useEffect(() => {
    if (showAvailable) {
      handleAvailableClick();
    }
  }, [showAvailable]);

  const renderTableBody = () => {
    if (showAvailableProducts) {
      if (availableProducts.length > 0) {
        return availableProducts.map((product) => (
          <TableRow key={product._id}>
            <TableCell sx={{ borderBottom: 'none' }}>{product.name}</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>{product.price}</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>
              {product.isAvailable ? 'Yes' : 'No'}
            </TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>
              <EditIcon onClick={() => handleEditClick(product)} />
            </TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>
              <DeleteIcon
                onClick={() => {
                  setOpenDelete(true);
                  setSelectedProduct(product);
                }}
              />
            </TableCell>
          </TableRow>
        ));
      } else {
        return (
          <TableRow>
            <TableCell sx={{ borderBottom: 'none' }} colSpan={5}>
              No available product is there
            </TableCell>
          </TableRow>
        );
      }
    } else if (products.length > 0) {
      return products.map((product) => (
        <TableRow key={product._id}>
          <TableCell sx={{ borderBottom: 'none' }}>{product.name}</TableCell>
          <TableCell sx={{ borderBottom: 'none' }}>{product.price}</TableCell>
          <TableCell sx={{ borderBottom: 'none' }}>
            {product.isAvailable ? 'Yes' : 'No'}
          </TableCell>
          <TableCell sx={{ borderBottom: 'none' }}>
            <EditIcon onClick={() => handleEditClick(product)} />
          </TableCell>
          <TableCell sx={{ borderBottom: 'none' }}>
            <DeleteIcon
              onClick={() => {
                setOpenDelete(true);
                setSelectedProduct(product);
              }}
            />
          </TableCell>
        </TableRow>
      ));
    } else {
      return (
        <TableRow>
          <TableCell sx={{ borderBottom: 'none' }} colSpan={5}>
            No product is there
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <TableContainer
        sx={{
          mt: 3,
          mb: 2,
          ml: 10,
          mr: 10,
          width: '75%',
          backgroundColor: '#fff',
          overflowX: 'hidden',
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
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <EditModal
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        product={selectedProduct}
      />

      <DeleteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        product={selectedProduct}
      />
    </Box>
  );
}

export default Home;

