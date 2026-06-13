import { useState } from "react";
import { Box, MenuItem, Select, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { AdminHeader } from "@components/AdminHeader";
import { StyledButton } from "@components/StyledButton";
import { StyledInput } from "@components/StyledInput";
import { ImageUpload } from "@components/ImageUpload";
import type { CategoryNode, CreateProductDTO, Product } from "@types";
import { productFormStyles } from "./ProductForm.styles";

interface ProductFormProps {
  product?: Product;
  categories: CategoryNode[];
  onSubmit: (dto: CreateProductDTO) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const flattenCategories = (nodes: CategoryNode[]): { id: string; name: string }[] =>
  nodes.flatMap(node => [
    { id: node.id, name: node.name },
    ...flattenCategories(node.children),
  ]);

const ProductForm = ({ product, categories, onSubmit, onCancel, isSaving }: ProductFormProps) => {
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [qtyInStock, setQtyInStock] = useState(product ? String(product.qtyInStock) : "");
  const [isActive, setIsActive] = useState(product?.isActive ?? true);
  const [productImage, setProductImage] = useState(product?.productImage ?? "");
  const [categoryId, setCategoryId] = useState(product?.categories[0]?.id ?? "");

  const categoryOptions = flattenCategories(categories);

  const priceValue = Number(price);
  const canSave = name.trim().length > 0 && price !== "" && !isNaN(priceValue) && priceValue >= 0;

  const handleSave = () => {
    onSubmit({
      name: name.trim(),
      description: description.trim() || undefined,
      productImage: productImage || undefined,
      price: priceValue,
      qtyInStock: qtyInStock === "" ? undefined : Number(qtyInStock),
      isActive,
      categoryIds: categoryId ? [categoryId] : undefined,
    });
  };

  const actions = (
    <>
      <StyledButton variant="outlined" color="secondary" disabled={isSaving} loading={false} onClick={onCancel}>
        Cancel
      </StyledButton>
      <StyledButton variant="contained" color="secondary" disabled={!canSave} loading={isSaving} onClick={handleSave}>
        Submit
      </StyledButton>
    </>
  );

  return (
    <Box>
      <AdminHeader title={product ? "Edit product" : "New product"} actions={actions} />

      <Box sx={productFormStyles.layout}>
        <Box sx={productFormStyles.leftColumn}>
          <Box sx={productFormStyles.card}>
            <Typography sx={productFormStyles.cardTitle}>Product image</Typography>
            <ImageUpload imageUrl={productImage} onUploaded={setProductImage} />

            <Box sx={productFormStyles.visibilitySection}>
              <Typography sx={productFormStyles.sectionLabel}>Visibility</Typography>
              <ToggleButtonGroup
                exclusive
                value={isActive ? "active" : "hidden"}
                onChange={(_, value) => value !== null && setIsActive(value === "active")}
                size="small"
              >
                <ToggleButton value="active">Active</ToggleButton>
                <ToggleButton value="hidden" sx={productFormStyles.hiddenToggle}>
                  Hidden
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Box>

        <Box sx={productFormStyles.rightColumn}>
          <Box sx={productFormStyles.card}>
            <Typography sx={productFormStyles.cardTitle}>Details</Typography>

            <Box sx={productFormStyles.fields}>
              <Box>
                <Typography sx={productFormStyles.fieldLabel}>Product name</Typography>
                <StyledInput
                  type="text"
                  placeholder="e.g. Cropped denim jacket"
                  value={name}
                  onChange={setName}
                />
              </Box>

              <Box>
                <Typography sx={productFormStyles.fieldLabel}>Category</Typography>
                <Select
                  fullWidth
                  value={categoryId}
                  onChange={event => setCategoryId(event.target.value)}
                  displayEmpty
                  size="small"
                >
                  <MenuItem value="">No category</MenuItem>
                  {categoryOptions.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Box>
                <Typography sx={productFormStyles.fieldLabel}>Description</Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  placeholder="Describe the product"
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                />
              </Box>

              <Box>
                <Typography sx={productFormStyles.fieldLabel}>Price ($)</Typography>
                <StyledInput
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={setPrice}
                />
              </Box>

              <Box>
                <Typography sx={productFormStyles.fieldLabel}>Stock quantity</Typography>
                <StyledInput
                  type="number"
                  placeholder="0"
                  value={qtyInStock}
                  onChange={setQtyInStock}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { ProductForm };
