import { useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Backdrop from '@mui/material/Backdrop';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCategories } from '@api/hooks/categories/useGetCategories';
import { SearchBar } from '@components/SearchBar';
import { CartDrawer } from '@components/CartDrawer';
import { CategoryDropdown } from '@components/CategoryDropdown';
import ballyLogo from '@/assets/bally-black.png';
import type { CategoryNode } from '@types';
import { navbarStyles } from './Navbar.styles';

const CLOSE_DELAY_MS = 150;

const Navbar = () => {
  const { categories } = useGetCategories();
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
    if (cat.children.length === 0) {
      navigate(`/catalog?category=${cat.id}`);
    }
  };

  const handleDropdownClose = () => {
    clearCloseTimer();
    setActiveCategory(null);
  };

  return (
    <>
      <AppBar position="sticky" color="transparent" sx={navbarStyles.appBar}>
        <Toolbar sx={navbarStyles.toolbar}>
          <Box sx={navbarStyles.left}>
            {categories.map(cat => (
              <Button
                key={cat.id}
                onMouseEnter={() => handleCategoryMouseEnter(cat)}
                onMouseLeave={scheduleDropdownClose}
                onClick={() => handleCategoryClick(cat)}
                sx={{
                  ...(navbarStyles.categoryButton as object),
                  ...(activeCategory?.id === cat.id
                    ? (navbarStyles.categoryButtonActive as object)
                    : {}),
                }}
                disableRipple
              >
                {cat.name}
              </Button>
            ))}
          </Box>

          <Box sx={navbarStyles.center}>
            <Link to="/">
              <Box component="img" src={ballyLogo} alt="Bally" sx={navbarStyles.logo} />
            </Link>
          </Box>

          <Box sx={navbarStyles.right}>
            <IconButton
              onClick={() => setSearchOpen(prev => !prev)}
              sx={navbarStyles.iconButton}
              disableRipple
            >
              <SearchIcon sx={navbarStyles.icon} />
            </IconButton>

            <IconButton
              onClick={() => setCartOpen(true)}
              sx={navbarStyles.iconButton}
              disableRipple
            >
              <ShoppingCartOutlinedIcon sx={navbarStyles.icon} />
            </IconButton>

            <IconButton
              component={Link}
              to="/user"
              sx={navbarStyles.iconButton}
              disableRipple
            >
              <PersonOutlineIcon sx={navbarStyles.icon} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Backdrop
        open={searchOpen}
        invisible
        onClick={() => setSearchOpen(false)}
        sx={navbarStyles.backdrop}
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

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export { Navbar };
