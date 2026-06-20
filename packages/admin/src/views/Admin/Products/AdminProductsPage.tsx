import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { AdminHeader } from "@components/AdminHeader";
import { AdminFilterBar } from "@components/AdminFilterBar";
import { PaginatedView } from "@shared/components/PaginatedView";
import { Modal } from "@shared/components/Modal";
import { useProductFilters } from "@shared/api/hooks/products/useProductFilters";
import { useGetProducts } from "@shared/api/hooks/products/useGetProducts";
import { useGetCategories } from "@shared/api/hooks/categories/useGetCategories";
import type { CreateProductDTO, Product } from "@shared/types";
import { ProductTable } from "./Components/ProductTable";
import { ProductForm } from "./Components/ProductForm";
import { useUploadProduct } from "./hooks/useUploadProduct";
import { useRemoveProduct } from "./hooks/useRemoveProduct";

const ADMIN_PARAMS = { includeInactive: true };

const AdminProductsPage: React.FC = () => {
  const [filters, setFilters] = useProductFilters();
  const { paginatedProducts, setPaginatedProducts, loading } = useGetProducts(filters, ADMIN_PARAMS);
  const { categories } = useGetCategories();
  const { uploadProduct, isSaving } = useUploadProduct(setPaginatedProducts);
  const { removeProduct, isRemoving } = useRemoveProduct(setPaginatedProducts);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | undefined>(undefined);
  const [pendingDelete, setPendingDelete] = useState<Product | undefined>(undefined);

  const categoryOptions = categories.map(category => ({
    label: category.name,
    value: category.id,
  }));

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
    <IconButton onClick={openCreate} color="secondary">
      <AddIcon />
    </IconButton>
  );

  return (
    <Box>
      <AdminHeader title="Products" actions={actions} />

      <AdminFilterBar
        options={categoryOptions}
        value={filters.category}
        onValueChange={value => setFilters({ category: value, page: 1 })}
        search={filters.name ?? ""}
        onSearchChange={search => setFilters({ name: search || null, page: 1 })}
        searchPlaceholder="Search products..."
      />

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

      <Modal
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(undefined)}
        title="Delete product"
        onSubmit={handleConfirmDelete}
        submitLabel="Delete"
        submitColor="error"
        isLoading={isRemoving}
      >
        <Typography>
          {`"${pendingDelete?.name}" will be permanently deleted. This cannot be undone.`}
        </Typography>
      </Modal>
    </Box>
  );
};

export { AdminProductsPage };
