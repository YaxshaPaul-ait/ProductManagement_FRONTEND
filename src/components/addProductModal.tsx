import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  Input,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../config/actions";
import { RootState } from "../config/store";

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
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.products);

  const [product, setProduct] = useState<Product>({
    name: "",
    price: "",
    isAvailable: true,
    images: [],
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      if (product.images.length + newImages.length > 12) {
        alert("You can upload up to 12 images only.");
        return;
      }
      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  // Handle product submission
  const handleAddProduct = () => {
    if (!product.name || !product.price) {
      alert("Name and price are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("isAvailable", product.isAvailable.toString());

    product.images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(createProduct(formData) as any);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "30vw",
          bgcolor: "background.paper",
          border: "2px solid #fff",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ color: "black" }}>
          Add Product
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
          fullWidth
          required
        />
        <TextField
          label="Price"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          type="number"
          sx={{ mb: 2 }}
          fullWidth
          required
        />
        <TextField
          label="Is Available"
          name="isAvailable"
          value={product.isAvailable}
          onChange={handleInputChange}
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
          sx={{ backgroundColor: "#01615F" }}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Modal>
  );
};

export default AddProduct;
