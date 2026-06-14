import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useGetProduct } from '@api/hooks/products/useGetProduct';
import { useAppendCartItem } from '@contexts/cart/hooks/useAppendCartItem';
import { LoadingScreen } from '@components/LoadingScreen';
import { productPageStyles } from './ProductPage.styles';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { product, loading } = useGetProduct(productId!);
  const { appendCartItem } = useAppendCartItem();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!loading && !product) {
      navigate('/404');
    }
  }, [loading, product]);

  if (!product) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={productPageStyles.root}>
      <Box sx={productPageStyles.imageSection}>
        {product.productImage ? (
          <Box
            component="img"
            src={product.productImage}
            alt={product.name}
sx={productPageStyles.image}
          />
        ) : (
          <Box sx={productPageStyles.imagePlaceholder} />
        )}
      </Box>

      <Box sx={productPageStyles.infoSection}>
        <Typography sx={productPageStyles.name}>{product.name}</Typography>
        <Typography sx={productPageStyles.price}>₪{Number(product.price).toFixed(2)}</Typography>

        <Button
          sx={productPageStyles.addToCartButton}
          disableRipple
          disableElevation
          onClick={() => {
            if (added) return;
            setAdded(true);
            appendCartItem(product.id);
            setTimeout(() => setAdded(false), 1500);
          }}
        >
          <Box className={added ? 'is-added' : ''} sx={productPageStyles.buttonContent}>
            <Box sx={productPageStyles.buttonStateDefault}>
              <AddIcon />
              ADD TO CART
            </Box>
            <Box sx={productPageStyles.buttonStateAdded}>
              <CheckIcon />
              ADDED
            </Box>
          </Box>
        </Button>

        {product.description && (
          <Box
            sx={productPageStyles.description}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        )}
      </Box>
    </Box>
  );
};

export { ProductPage };
