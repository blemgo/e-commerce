import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Slider,
} from '@mui/material';
import { useState } from 'react';
import type { ProductFilters } from '@types';
import { StyledInput } from '@components/StyledInput';
import { allFiltersModalStyles } from './AllFiltersModalStyle';

interface AllFiltersModalProps {
  open: boolean;
  onClose: () => void;
  filters: ProductFilters;
  onApply: (filters: ProductFilters) => void;
}

const PRICE_MIN = 0;
const PRICE_MAX = 200;

const AllFiltersModal = ({ open, onClose, filters, onApply }: AllFiltersModalProps) => {
  const [local, setLocal] = useState<ProductFilters>(filters);

  const set = (patch: Partial<ProductFilters>) => setLocal(prev => ({ ...prev, ...patch }));

  const handleApply = () => {
    onApply({ ...local, page: 1 });
    onClose();
  };

  const handleClear = () => {
    const cleared: ProductFilters = { page: 1, limit: filters.limit };
    setLocal(cleared);
    onApply(cleared);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: allFiltersModalStyles.paper } }}
    >
      <DialogContent sx={allFiltersModalStyles.dialogContent}>
        <Typography variant="h6" sx={allFiltersModalStyles.title}>
          All Filters
        </Typography>

        <Box sx={allFiltersModalStyles.section}>
          <Typography variant="body2" sx={allFiltersModalStyles.label}>
            Price range
          </Typography>
          <Box sx={allFiltersModalStyles.sliderWrapper}>
            <Slider
              value={[local.minPrice ?? PRICE_MIN, local.maxPrice ?? PRICE_MAX]}
              onChange={(_, val) => {
                const [min, max] = val as [number, number];
                set({
                  minPrice: min === PRICE_MIN ? undefined : min,
                  maxPrice: max === PRICE_MAX ? undefined : max,
                });
              }}
              min={PRICE_MIN}
              max={PRICE_MAX}
              color="secondary"
              disableSwap
            />
          </Box>
          <Box sx={allFiltersModalStyles.priceInputRow}>
            <Box sx={allFiltersModalStyles.priceInput}>
              <StyledInput
                type="number"
                placeholder="MIN"
                value={String(local.minPrice ?? '')}
                onChange={val => set({ minPrice: val ? Number(val) : undefined })}
                slotProps={{ htmlInput: { min: PRICE_MIN, max: local.maxPrice ?? PRICE_MAX } }}
              />
            </Box>
            <Box sx={allFiltersModalStyles.priceInput}>
              <StyledInput
                type="number"
                placeholder="MAX"
                value={String(local.maxPrice ?? '')}
                onChange={val => set({ maxPrice: val ? Number(val) : undefined })}
                slotProps={{ htmlInput: { min: local.minPrice ?? PRICE_MIN, max: PRICE_MAX } }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={allFiltersModalStyles.section}>
          <Typography variant="body2" sx={allFiltersModalStyles.label}>
            Sort
          </Typography>
          <Box sx={allFiltersModalStyles.row}>
            <TextField
              select
              size="small"
              label="Sort by"
              value={local.sortBy ?? ''}
              onChange={e => set({ sortBy: (e.target.value as ProductFilters['sortBy']) || undefined })}
              sx={allFiltersModalStyles.sortSelect}
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="price">Price</MenuItem>
            </TextField>
            <TextField
              select
              size="small"
              label="Order"
              value={local.sortOrder ?? ''}
              onChange={e =>
                set({ sortOrder: (e.target.value as ProductFilters['sortOrder']) || undefined })
              }
              sx={allFiltersModalStyles.sortSelect}
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="ASC">Ascending</MenuItem>
              <MenuItem value="DESC">Descending</MenuItem>
            </TextField>
          </Box>
        </Box>

        <Box sx={allFiltersModalStyles.actions}>
          <Button variant="text" color="inherit" onClick={handleClear}>
            Clear all
          </Button>
          <Button variant="contained" color="secondary" onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export { AllFiltersModal };
