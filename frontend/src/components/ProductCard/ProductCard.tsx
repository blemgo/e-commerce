import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@types';
import { productCardStyles } from './ProductCard.styles';

interface ProductCardProps {
  product: Product;
  onProductAdd: (product: Product) => void;
}

const ProductCard = ({ product, onProductAdd }: ProductCardProps) => {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (added) return;

    setAdded(true);
    onProductAdd(product);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Box sx={productCardStyles.card} onClick={handleCardClick}>
      <Box sx={productCardStyles.imageWrapper}>
        {product.productImage && !imgError ? (
          <Box
            component="img"
            src={product.productImage}
            alt={product.name}
            sx={productCardStyles.image}
            onError={() => setImgError(true)}
          />
        ) : (
          <Box sx={productCardStyles.imagePlaceholder} />
        )}

        <Box
          className={`overlay-add-btn${added ? ' overlay-add-btn--active' : ''}`}
          sx={productCardStyles.overlayButton}
          onClick={handleAdd}
        >
          {added ? <CheckIcon /> : <AddIcon />}
        </Box>
      </Box>

      <Typography sx={productCardStyles.productName}>
        {product.name}
      </Typography>

      <Typography sx={productCardStyles.productPrice}>
        ${Number(product.price).toFixed(2)}
      </Typography>
    </Box>
  );
};

export { ProductCard };
