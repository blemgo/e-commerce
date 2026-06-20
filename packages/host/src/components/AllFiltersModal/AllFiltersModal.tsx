import { Typography, TextField, MenuItem, Box, Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useProductFilters } from '@api/hooks/products/useProductFilters';
import type { ProductFilters } from '@api/hooks/products/useProductFilters';
import { Modal } from '@components/Modal';
import { StyledInput } from '@components/StyledInput';
import { allFiltersModalStyles } from './AllFiltersModal.styles';

interface AllFiltersModalProps {
  open: boolean;
  onClose: () => void;
}

type ModalState = Pick<ProductFilters, 'minPrice' | 'maxPrice' | 'sortBy' | 'sortOrder'>;

const PRICE_MIN = 0;
const PRICE_MAX = 200;

const AllFiltersModal: React.FC<AllFiltersModalProps> = ({ open, onClose }: AllFiltersModalProps) => {
  const [filters, setFilters] = useProductFilters();
  const [filterValues, setFilterValues] = useState<ModalState>({
    minPrice: null,
    maxPrice: null,
    sortBy: null,
    sortOrder: null,
  });

  const set = (patch: Partial<ModalState>) => setFilterValues(prev => ({ ...prev, ...patch }));

  useEffect(() => {
    if (open) {
      setFilterValues({
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleApply = () => {
    // reset page so new filters don't land on a now-nonexistent page
    setFilters({ ...filterValues, page: null });
    onClose();
  };

  const handleClear = () => {
    const cleared: ModalState = { minPrice: null, maxPrice: null, sortBy: null, sortOrder: null };
    setFilterValues(cleared);
    // reset page so new filters don't land on a now-nonexistent page
    setFilters({ ...cleared, page: null });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="All Filters"
      onSubmit={handleApply}
      submitLabel="Apply"
      onCancel={handleClear}
      cancelLabel="Clear all"
      fullWidth
    >
      <Box>
        <Box sx={allFiltersModalStyles.section}>
          <Typography variant="body2" sx={allFiltersModalStyles.label}>
            Price range
          </Typography>
          <Box sx={allFiltersModalStyles.sliderWrapper}>
            <Slider
              value={[filterValues.minPrice ?? PRICE_MIN, filterValues.maxPrice ?? PRICE_MAX]}
              onChange={(_, val) => {
                const [min, max] = val as [number, number];
                set({
                  minPrice: min === PRICE_MIN ? null : min,
                  maxPrice: max === PRICE_MAX ? null : max,
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
                value={String(filterValues.minPrice ?? '')}
                onChange={val => set({ minPrice: val ? Number(val) : null })}
                slotProps={{ htmlInput: { min: PRICE_MIN, max: filterValues.maxPrice ?? PRICE_MAX } }}
              />
            </Box>
            <Box sx={allFiltersModalStyles.priceInput}>
              <StyledInput
                type="number"
                placeholder="MAX"
                value={String(filterValues.maxPrice ?? '')}
                onChange={val => set({ maxPrice: val ? Number(val) : null })}
                slotProps={{ htmlInput: { min: filterValues.minPrice ?? PRICE_MIN, max: PRICE_MAX } }}
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
              value={filterValues.sortBy ?? ''}
              onChange={e => set({ sortBy: (e.target.value as ProductFilters['sortBy']) || null })}
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
              value={filterValues.sortOrder ?? ''}
              onChange={e =>
                set({ sortOrder: (e.target.value as ProductFilters['sortOrder']) || null })
              }
              sx={allFiltersModalStyles.sortSelect}
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="ASC">Ascending</MenuItem>
              <MenuItem value="DESC">Descending</MenuItem>
            </TextField>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export { AllFiltersModal };
