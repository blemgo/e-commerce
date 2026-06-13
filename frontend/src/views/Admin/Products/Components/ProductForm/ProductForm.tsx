import { useState } from "react";
import { Box, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { AdminHeader } from "@components/AdminHeader";
import { StyledButton } from "@components/StyledButton";
import { StyledInput } from "@components/StyledInput";
import { ImageUpload } from "@components/ImageUpload";
import { CategorySelect } from "@components/CategorySelect";
import type { CategoryNode, CreateProductDTO, Product } from "@types";
import { productFormStyles } from "./ProductForm.styles";

interface ProductFormProps {
  product?: Product;
  categories: CategoryNode[];
  onSubmit: (dto: CreateProductDTO, imageFile: File | null) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, categories, onSubmit, onCancel, isSaving }: ProductFormProps) => {
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [qtyInStock, setQtyInStock] = useState(product ? String(product.qtyInStock) : "");
  const [isActive, setIsActive] = useState(product?.isActive ?? true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categoryIds, setCategoryIds] = useState<string[]>(
    product?.categories.map(category => category.id) ?? [],
  );

  const priceValue = Number(price);
  const hasImage = imageFile !== null || Boolean(product?.productImage);
  const canSave =
    name.trim().length > 0 && price !== "" && !isNaN(priceValue) && priceValue >= 0 && hasImage;

  const handleSubmit = () => {
    onSubmit(
      {
        name: name.trim(),
        description: description.trim() || undefined,
        price: priceValue,
        qtyInStock: qtyInStock === "" ? undefined : Number(qtyInStock),
        isActive,
        categoryIds: categoryIds.length ? categoryIds : undefined,
      },
      imageFile,
    );
  };

  const actions = (
    <>
      <StyledButton
        variant="outlined"
        color="secondary"
        disabled={isSaving}
        loading={false}
        onClick={onCancel}
      >
        Cancel
      </StyledButton>
      <StyledButton
        variant="contained"
        color="secondary"
        disabled={!canSave || isSaving}
        loading={isSaving}
        onClick={handleSubmit}
      >
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
            <ImageUpload imageUrl={product?.productImage} onFileSelected={setImageFile} />

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
                <Typography sx={productFormStyles.fieldLabel}>Categories</Typography>
                <CategorySelect
                  categories={categories}
                  selectedIds={categoryIds}
                  onChange={setCategoryIds}
                />
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
