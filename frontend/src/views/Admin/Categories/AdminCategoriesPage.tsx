import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import AddIcon from "@mui/icons-material/Add";
import { AdminHeader } from "@components/AdminHeader";
import { StyledButton } from "@components/StyledButton";
import { useGetCategories } from "@api/hooks/categories/useGetCategories";
import type { CategoryNode, CreateCategoryDTO } from "@types";
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

      <Dialog open={Boolean(pendingDelete)} onClose={() => setPendingDelete(undefined)}>
        <DialogTitle>Delete category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`"${pendingDelete?.name}" will be deleted. Any sub-categories move to the top level.`}
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

export { AdminCategoriesPage };
