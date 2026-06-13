import { useState } from 'react';
import { Container } from '@mui/material';
import { ProductStack } from '@components/ProductStack';
import { FilterBar } from '@components/FilterBar';
import { AllFiltersModal } from '@components/AllFiltersModal';
import { catalogPageStyles } from './CatalogPage.styles';

const CatalogPage: React.FC = () => {
  const [allFiltersOpen, setAllFiltersOpen] = useState(false);

  return (
    <Container maxWidth="xl" sx={catalogPageStyles.container}>
      <FilterBar onOpenAllFilters={() => setAllFiltersOpen(true)} />
      <ProductStack />
      <AllFiltersModal
        open={allFiltersOpen}
        onClose={() => setAllFiltersOpen(false)}
      />
    </Container>
  );
};

export { CatalogPage };
