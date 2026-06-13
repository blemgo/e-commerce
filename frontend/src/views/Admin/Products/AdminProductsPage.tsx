import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { AdminHeader } from "@components/AdminHeader";
import { CategoryBar } from "@components/CategoryBar";
import { SearchBar } from "@components/SearchBar";
import { PaginatedView } from "@components/PaginatedView";
import { StyledButton } from "@components/StyledButton";
import { useProductFilters } from "@api/hooks/products/useProductFilters";
import { useGetProducts } from "@api/hooks/products/useGetProducts";
import { useGetCategories } from "@api/hooks/categories/useGetCategories";
import type { CreateProductDTO, Product } from "@types";
import { ProductTable } from "./Components/ProductTable";
import { ProductForm } from "./Components/ProductForm";
import { useUploadProduct } from "./hooks/useUploadProduct";
import { useRemoveProduct } from "./hooks/useRemoveProduct";
import { adminProductsPageStyles } from "./AdminProductsPage.styles";

const ADMIN_PARAMS = { includeInactive: true };

const AdminProductsPage = () => {
  const [filters, setFilters] = useProductFilters();
  const { paginatedProducts, setPaginatedProducts, loading } = useGetProducts(filters, ADMIN_PARAMS);
  const { categories } = useGetCategories();
  const { uploadProduct, isSaving } = useUploadProduct(setPaginatedProducts);
  const { removeProduct, isRemoving } = useRemoveProduct(setPaginatedProducts);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Product | undefined>(undefined);

  const openCreate = () => {
    setEditing(undefined);
    setIsFormOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setIsFormOpen(true);
  };

  const handleSubmit = async (dto: CreateProductDTO, imageFile: File | null) => {
    try {
      await uploadProduct(editing, dto, imageFile);
    } catch {
      return;
    }

    setIsFormOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) {
      return;
    }

    try {
      await removeProduct(pendingDelete);
    } catch {
      return;
    }

    setPendingDelete(undefined);
  };

  if (isFormOpen) {
    return (
      <ProductForm
        key={editing?.id ?? "new"}
        product={editing}
        categories={categories}
        onSubmit={handleSubmit}
        onCancel={() => setIsFormOpen(false)}
        isSaving={isSaving}
      />
    );
  }

  const actions = (
    <>
      <IconButton onClick={() => setIsSearchOpen(open => !open)}>
        <SearchIcon />
      </IconButton>
      <IconButton onClick={openCreate} color="secondary">
        <AddIcon />
      </IconButton>
    </>
  );

  return (
    <Box>
      <AdminHeader title="Products" actions={actions} />

      {isSearchOpen && (
        <Box sx={adminProductsPageStyles.searchContainer}>
          <SearchBar />
        </Box>
      )}

      <Box sx={adminProductsPageStyles.categoryBar}>
        <CategoryBar
          categories={categories}
          activeId={filters.category ?? undefined}
          onChange={id => setFilters({ category: id ?? null, page: null })}
        />
      </Box>

      <PaginatedView
        loading={loading}
        isEmpty={!paginatedProducts?.data.length}
        emptyMessage="No products found."
        page={paginatedProducts?.page ?? 1}
        totalPages={paginatedProducts?.totalPages ?? 1}
        onPageChange={page => setFilters({ page })}
      >
        <ProductTable
          products={paginatedProducts?.data ?? []}
          onEdit={openEdit}
          onDelete={setPendingDelete}
        />
      </PaginatedView>

      <Dialog open={Boolean(pendingDelete)} onClose={() => setPendingDelete(undefined)}>
        <DialogTitle>Delete product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`"${pendingDelete?.name}" will be permanently deleted. This cannot be undone.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton
            variant="text"
            color="secondary"
            disabled={isRemoving}
            loading={false}
            onClick={() => setPendingDelete(undefined)}
          >
            Cancel
          </StyledButton>
          <StyledButton
            variant="contained"
            color="error"
            disabled={false}
            loading={isRemoving}
            onClick={handleConfirmDelete}
          >
            Delete
          </StyledButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export { AdminProductsPage };
