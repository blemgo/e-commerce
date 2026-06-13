import { Box, Button, Chip, Divider, MenuItem, Select, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useProductFilters } from '@api/hooks/products/useProductFilters';
import type { ProductFilters } from '@api/hooks/products/useProductFilters';
import { filterBarStyles } from './FilterBar.styles';

interface FilterBarProps {
  onOpenAllFilters: () => void;
}

interface QuickFilter {
  label: string;
  patch: Partial<ProductFilters>;
  isActive: (f: ProductFilters) => boolean;
}

const QUICK_FILTERS: QuickFilter[] = [
  {
    label: 'Under $50',
    patch: { maxPrice: 50 },
    isActive: f => f.maxPrice === 50,
  },
  {
    label: 'Under $100',
    patch: { maxPrice: 100 },
    isActive: f => f.maxPrice === 100,
  },
];

type SortOption = { label: string; sortBy: ProductFilters['sortBy']; sortOrder: ProductFilters['sortOrder'] };

const SORT_OPTIONS: SortOption[] = [
  { label: 'Newest', sortBy: null, sortOrder: null },
  { label: 'Price: Low to High', sortBy: 'price', sortOrder: 'ASC' },
  { label: 'Price: High to Low', sortBy: 'price', sortOrder: 'DESC' },
  { label: 'Name A–Z', sortBy: 'name', sortOrder: 'ASC' },
  { label: 'Name Z–A', sortBy: 'name', sortOrder: 'DESC' },
];

const getSortValue = (filters: ProductFilters): string => {
  const match = SORT_OPTIONS.find(
    o => o.sortBy === filters.sortBy && o.sortOrder === filters.sortOrder,
  );

  return match?.label ?? 'Newest';
};

const FilterBar: React.FC<FilterBarProps> = ({ onOpenAllFilters }: FilterBarProps) => {
  const [filters, setFilters] = useProductFilters();

  const toggleQuickFilter = (qf: QuickFilter) => {
    if (qf.isActive(filters)) {
      const off = Object.fromEntries(Object.keys(qf.patch).map(key => [key, null]));
      setFilters({ ...off, page: null });
    } else {
      setFilters({ ...qf.patch, page: null });
    }
  };

  const handleSortChange = (label: string) => {
    const option = SORT_OPTIONS.find(o => o.label === label);

    if (!option) return;

    setFilters({ sortBy: option.sortBy, sortOrder: option.sortOrder, page: null });
  };

  return (
    <Box sx={filterBarStyles.container}>
      <Button
        variant="outlined"
        startIcon={<TuneIcon />}
        sx={filterBarStyles.allFiltersBtn}
        onClick={onOpenAllFilters}
      >
        All filters
      </Button>

      <Divider orientation="vertical" flexItem sx={filterBarStyles.divider} />

      {QUICK_FILTERS.map(qf => (
        <Chip
          key={qf.label}
          label={qf.label}
          onClick={() => toggleQuickFilter(qf)}
          color={qf.isActive(filters) ? 'secondary' : 'default'}
          variant={qf.isActive(filters) ? 'filled' : 'outlined'}
          clickable
        />
      ))}

      <Box sx={filterBarStyles.sortContainer}>
        <Typography variant="body2" sx={filterBarStyles.sortLabel}>
          Sort:
        </Typography>
        <Select
          value={getSortValue(filters)}
          onChange={e => handleSortChange(e.target.value)}
          variant="outlined"
          size="small"
          color="secondary"
          sx={{
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 14,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
          }}
        >
          {SORT_OPTIONS.map(o => (
            <MenuItem key={o.label} value={o.label}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export { FilterBar };
