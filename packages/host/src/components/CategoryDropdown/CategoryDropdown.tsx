import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import type { CategoryNode } from '@types';
import { categoryDropdownStyles } from './CategoryDropdown.styles';

interface CategoryRowProps {
  node: CategoryNode;
  depth: number;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onClose: () => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ node, depth, expandedIds, onToggle, onClose }: CategoryRowProps) => {
  const isExpanded = expandedIds.has(node.id);
  const hasChildren = node.children.length > 0;

  return (
    <>
      <Box sx={categoryDropdownStyles.itemRow}>
        <ListItemButton
          component={Link}
          to={`/catalog?category=${node.id}`}
          onClick={onClose}
          disableRipple
          sx={{ ...(categoryDropdownStyles.item as object), pl: 1.5 + depth * 2 }}
        >
          <ListItemText
            primary={node.name.toUpperCase()}
            slotProps={{ primary: { sx: categoryDropdownStyles.itemText } }}
          />
        </ListItemButton>

        {hasChildren && (
          <IconButton
            size="small"
            onClick={() => onToggle(node.id)}
            disableRipple
            sx={categoryDropdownStyles.chevronButton}
          >
            <ChevronRightIcon
              sx={{
                ...(categoryDropdownStyles.chevronIcon as object),
                transform: isExpanded ? 'rotate(90deg)' : 'none',
              }}
            />
          </IconButton>
        )}
      </Box>

      {isExpanded &&
        node.children.map(child => (
          <CategoryRow
            key={child.id}
            node={child}
            depth={depth + 1}
            expandedIds={expandedIds}
            onToggle={onToggle}
            onClose={onClose}
          />
        ))}
    </>
  );
};

interface CategoryDropdownProps {
  category: CategoryNode;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  category,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: CategoryDropdownProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <Box
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={categoryDropdownStyles.overlay}
    >
      <List disablePadding sx={categoryDropdownStyles.list}>
        <ListItemButton
          component={Link}
          to={`/catalog?category=${category.id}`}
          onClick={onClose}
          disableRipple
          sx={categoryDropdownStyles.item}
        >
          <ListItemText
            primary="ALL PRODUCTS"
            slotProps={{ primary: { sx: categoryDropdownStyles.allItemText } }}
          />
        </ListItemButton>

        {category.children.map(child => (
          <CategoryRow
            key={child.id}
            node={child}
            depth={0}
            expandedIds={expandedIds}
            onToggle={handleToggle}
            onClose={onClose}
          />
        ))}
      </List>
    </Box>
  );
};

export { CategoryDropdown };
