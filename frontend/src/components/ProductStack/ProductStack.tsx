import { Grid } from '@mui/material';
import { useGetProducts } from '@api/hooks/products/useGetProducts';
import { useProductFilters } from '@api/hooks/products/useProductFilters';
import { ProductCard } from '@components/ProductCard';
import { PaginatedView } from '@components/PaginatedView';
import type { Product } from '@types';
import { useAppendCartItem } from '@contexts/cart/hooks/useAppendCartItem';

const ProductStack: React.FC = () => {
  const [filters, setFilters] = useProductFilters();
  const { paginatedProducts, loading } = useGetProducts(filters);
  const { appendCartItem } = useAppendCartItem();

  const handleProductAdd = (product: Product) => {
    appendCartItem(product.id);
  };

  return (
    <PaginatedView
      loading={loading}
      isEmpty={!paginatedProducts?.data.length}
      emptyMessage="No products found."
      page={paginatedProducts?.page ?? 1}
      totalPages={paginatedProducts?.totalPages ?? 1}
      onPageChange={page => setFilters({ page })}
    >
      <Grid container spacing={2.5}>
        {paginatedProducts?.data.map(product => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <ProductCard product={product} onProductAdd={handleProductAdd} />
          </Grid>
        ))}
      </Grid>
    </PaginatedView>
  );
};

export { ProductStack };
