import { useState } from 'react';
import { Container } from '@mui/material';
import { ProductStack } from '@components/ProductStack';
import { FilterBar } from '@components/FilterBar';
import { AllFiltersModal } from '@components/AllFiltersModal';
import type { ProductFilters } from '@types';

const DEFAULT_FILTERS: ProductFilters = { page: 1, limit: 8 };

const Home = () => {
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS);
  const [allFiltersOpen, setAllFiltersOpen] = useState(false);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        onOpenAllFilters={() => setAllFiltersOpen(true)}
      />

      <ProductStack filters={filters} onFiltersChange={setFilters} />

      <AllFiltersModal
        open={allFiltersOpen}
        onClose={() => setAllFiltersOpen(false)}
        filters={filters}
        onApply={setFilters}
      />
    </Container>
  );
};

export { Home };
