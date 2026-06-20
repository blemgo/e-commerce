import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import type { CategoryNode } from "@shared/types";
import { categoryTreeStyles } from "./CategoryTree.styles";

interface CategoryTreeProps {
  categories: CategoryNode[];
  onEdit: (category: CategoryNode) => void;
  onDelete: (category: CategoryNode) => void;
}

const CategoryTree: React.FC<CategoryTreeProps> = ({ categories, onEdit, onDelete }) => {
  const renderNode = (node: CategoryNode) => (
    <TreeItem
      key={node.id}
      itemId={node.id}
      label={
        <Box sx={categoryTreeStyles.item}>
          <Typography sx={categoryTreeStyles.label}>{node.name}</Typography>

          <Box className="category-actions" sx={categoryTreeStyles.actions}>
            <IconButton
              size="small"
              onClick={event => {
                event.stopPropagation();
                onEdit(node);
              }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={event => {
                event.stopPropagation();
                onDelete(node);
              }}
            >
              <DeleteOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      }
    >
      {node.children.map(renderNode)}
    </TreeItem>
  );

  return (
    <SimpleTreeView sx={categoryTreeStyles.tree}>
      {categories.map(renderNode)}
    </SimpleTreeView>
  );
};

export { CategoryTree };
