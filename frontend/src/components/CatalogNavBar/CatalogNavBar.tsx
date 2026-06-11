import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Backdrop from '@mui/material/Backdrop';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCategories } from '@api/hooks/categories/useGetCategories';
import { Navbar } from '@components/Navbar';
import { SearchBar } from '@components/SearchBar';
import { CartDrawer } from '@components/CartDrawer';
import { CategoryDropdown } from '@components/CategoryDropdown';
import type { CategoryNode } from '@types';
import { useCartContext } from '@contexts/cart';
import { catalogNavBarStyles } from './CatalogNavBar.styles';

const CLOSE_DELAY_MS = 150;

const CatalogNavBar = () => {
  const { categories } = useGetCategories();
  const { cart } = useCartContext();
  const cartItemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryNode | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const scheduleDropdownClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, CLOSE_DELAY_MS);
  };

  const handleCategoryMouseEnter = (cat: CategoryNode) => {
    if (cat.children.length === 0) return;
    clearCloseTimer();
    setSearchOpen(false);
    setActiveCategory(cat);
  };

  const handleCategoryClick = (cat: CategoryNode) => {
    setActiveCategory(null);
    navigate(`/catalog?category=${cat.id}`);
  };

  const handleDropdownClose = () => {
    clearCloseTimer();
    setActiveCategory(null);
  };

  return (
    <>
      <Navbar
        left={categories.map(cat => (
          <Button
            key={cat.id}
            onMouseEnter={() => handleCategoryMouseEnter(cat)}
            onMouseLeave={scheduleDropdownClose}
            onClick={() => handleCategoryClick(cat)}
            sx={{
              ...(catalogNavBarStyles.categoryButton as object),
              ...(activeCategory?.id === cat.id
                ? (catalogNavBarStyles.categoryButtonActive as object)
                : {}),
            }}
            disableRipple
          >
            {cat.name}
          </Button>
        ))}
        right={
          <>
            <IconButton
              onClick={() => setSearchOpen(prev => !prev)}
              sx={catalogNavBarStyles.iconButton}
              disableRipple
            >
              <SearchIcon sx={catalogNavBarStyles.icon} />
            </IconButton>

            <IconButton
              onClick={() => setCartOpen(true)}
              sx={catalogNavBarStyles.iconButton}
              disableRipple
            >
              <Badge
                badgeContent={cartItemCount}
                color="primary"
                sx={catalogNavBarStyles.cartBadge}
              >
                <ShoppingCartOutlinedIcon sx={catalogNavBarStyles.icon} />
              </Badge>
            </IconButton>

            <IconButton
              component={Link}
              to="/account"
              sx={catalogNavBarStyles.iconButton}
              disableRipple
            >
              <PersonOutlineIcon sx={catalogNavBarStyles.icon} />
            </IconButton>
          </>
        }
      />

      <Backdrop
        open={searchOpen}
        invisible
        onClick={() => setSearchOpen(false)}
        sx={catalogNavBarStyles.backdrop}
      />

      {searchOpen && <SearchBar />}

      {activeCategory && (
        <CategoryDropdown
          key={activeCategory.id}
          category={activeCategory}
          onClose={handleDropdownClose}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleDropdownClose}
        />
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          navigate('/checkout');
        }}
      />
    </>
  );
};

export { CatalogNavBar };
