import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { StyledButton } from "@components/StyledButton";
import { StyledInput } from "@components/StyledInput";
import { flattenWithPath, formatPath } from "@components/CategorySelect/categoryOptions";
import type { CategoryNode, CreateCategoryDTO } from "@types";
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
    <Dialog open onClose={onCancel} fullWidth maxWidth="xs">
      <DialogTitle>{editing ? "Edit category" : "New category"}</DialogTitle>

      <DialogContent sx={categoryFormStyles.content}>
        <StyledInput
          type="text"
          placeholder="Category name"
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
      </DialogContent>

      <DialogActions>
        <StyledButton
          variant="text"
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
          Save
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export { CategoryForm };
