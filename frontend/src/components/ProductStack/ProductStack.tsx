import { Grid, Pagination, Typography, Box } from '@mui/material';
import { useGetProducts } from '@api/hooks/products/useGetProducts';
import { useProductFilters } from '@api/hooks/products/useProductFilters';
import { ProductCard } from '@components/ProductCard';
import { LoadingScreen } from '@components/LoadingScreen';
import type { Product } from '@types';
import { productStackStyles } from './ProductStack.styles';

const ProductStack = () => {
  const [filters, setFilters] = useProductFilters();
  const { paginatedProducts, loading } = useGetProducts(filters);

  const handleAddToCart = (_product: Product) => {
    // TODO: wire up cart context
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setFilters({ page });
  };

  if (loading) return <LoadingScreen />;

  if (!paginatedProducts || paginatedProducts.data.length === 0) {
    return (
      <Typography sx={productStackStyles.emptyState}>
        No products found.
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={2.5}>
        {paginatedProducts.data.map(product => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

      {paginatedProducts.totalPages > 1 && (
        <Box sx={productStackStyles.paginationContainer}>
          <Pagination
            count={paginatedProducts.totalPages}
            page={paginatedProducts.page}
            onChange={handlePageChange}
            color="secondary"
            shape="rounded"
          />
        </Box>
      )}
    </>
  );
};

export { ProductStack };
