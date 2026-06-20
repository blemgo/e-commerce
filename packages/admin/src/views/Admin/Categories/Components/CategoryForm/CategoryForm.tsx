import { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Modal } from "@shared/components/Modal";
import { StyledInput } from "@shared/components/StyledInput";
import { flattenWithPath, formatPath } from "@components/CategorySelect/categoryOptions";
import type { CategoryNode, CreateCategoryDTO } from "@shared/types";
import { categoryFormStyles } from "./CategoryForm.styles";

interface CategoryFormProps {
  editing?: CategoryNode;
  categories: CategoryNode[];
  onSubmit: (dto: CreateCategoryDTO) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  editing,
  categories,
  onSubmit,
  onCancel,
  isSaving,
}) => {
  const [name, setName] = useState(editing?.name ?? "");
  const [parentId, setParentId] = useState(editing?.parentId ?? "");

  const parentOptions = flattenWithPath(categories).filter(
    option => option.id !== editing?.id,
  );

  const canSave = name.trim().length > 0;

  const handleSubmit = () => {
    onSubmit({
      categoryName: name.trim(),
      parentCategoryId: parentId || null,
    });
  };

  return (
    <Modal
      open
      onClose={onCancel}
      title={editing ? "Edit category" : "New category"}
      onSubmit={handleSubmit}
      submitLabel="Save"
      submitDisabled={!canSave}
      isLoading={isSaving}
      fullWidth
      maxWidth="xs"
    >
      <Box sx={categoryFormStyles.content}>
        <StyledInput
          type="text"
          label="Category name"
          value={name}
          onChange={setName}
        />

        <TextField
          select
          fullWidth
          size="small"
          label="Parent category"
          value={parentId}
          onChange={event => setParentId(event.target.value)}
        >
          <MenuItem value="">None (top level)</MenuItem>
          {parentOptions.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {formatPath(option)}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Modal>
  );
};

export { CategoryForm };
