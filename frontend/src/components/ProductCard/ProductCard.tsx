import { Box, Typography, Chip, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@types';
import { productCardStyles } from './ProductCardStyle';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate();
  const isOutOfStock = product.qtyInStock === 0;
  const categoryName = product.categories[0]?.name;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <Box sx={productCardStyles.card} onClick={handleCardClick}>
      <Box sx={productCardStyles.imageWrapper}>
        {product.productImage ? (
          <Box component="img" src={product.productImage} alt={product.name} sx={productCardStyles.image} />
        ) : (
          <Box sx={productCardStyles.imagePlaceholder} />
        )}
      </Box>

      <Typography variant="body2" color="text.secondary" sx={productCardStyles.categoryText}>
        {categoryName ?? ' '}
      </Typography>

      <Box sx={productCardStyles.nameRow}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          {product.name}
        </Typography>
        {isOutOfStock && (
          <Chip label="Out Of Stock" color="error" size="small" />
        )}
      </Box>

      <Box sx={productCardStyles.priceRow}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          ${Number(product.price).toFixed(2)}
        </Typography>
        <Fab size="small" color="secondary" onClick={handleAddToCart} aria-label="Add to cart">
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export { ProductCard };
