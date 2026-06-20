import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { AdminHeader } from "@components/AdminHeader";
import { Modal } from "@shared/components/Modal";
import { useGetCategories } from "@shared/api/hooks/categories/useGetCategories";
import type { CategoryNode, CreateCategoryDTO } from "@shared/types";
import { CategoryTree } from "./Components/CategoryTree";
import { CategoryForm } from "./Components/CategoryForm";
import { useSaveCategory } from "./hooks/useSaveCategory";
import { useRemoveCategory } from "./hooks/useRemoveCategory";

const AdminCategoriesPage: React.FC = () => {
  const { categories, setCategories, loading } = useGetCategories();
  const { saveCategory, isSaving } = useSaveCategory(setCategories);
  const { removeCategory, isRemoving } = useRemoveCategory(setCategories);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryNode | undefined>(undefined);
  const [pendingDelete, setPendingDelete] = useState<CategoryNode | undefined>(undefined);

  const openCreate = () => {
    setEditing(undefined);
    setIsFormOpen(true);
  };

  const openEdit = (category: CategoryNode) => {
    setEditing(category);
    setIsFormOpen(true);
  };

  const handleSubmit = async (dto: CreateCategoryDTO) => {
    try {
      await saveCategory(editing, dto);
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
      await removeCategory(pendingDelete);
    } catch {
      return;
    }

    setPendingDelete(undefined);
  };

  const actions = (
    <IconButton onClick={openCreate} color="secondary">
      <AddIcon />
    </IconButton>
  );

  return (
    <Box>
      <AdminHeader title="Categories" actions={actions} />

      {!loading && categories.length === 0 ? (
        <Typography color="text.secondary">No categories yet.</Typography>
      ) : (
        <CategoryTree categories={categories} onEdit={openEdit} onDelete={setPendingDelete} />
      )}

      {isFormOpen && (
        <CategoryForm
          editing={editing}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
          isSaving={isSaving}
        />
      )}

      <Modal
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(undefined)}
        title="Delete category"
        onSubmit={handleConfirmDelete}
        submitLabel="Delete"
        submitColor="error"
        isLoading={isRemoving}
      >
        <Typography>
          {`"${pendingDelete?.name}" will be deleted. Any sub-categories move to the top level.`}
        </Typography>
      </Modal>
    </Box>
  );
};

export { AdminCategoriesPage };
