import { useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useProductFilters, productFiltersParsers } from '@shared/api/hooks/products/useProductFilters';
import { searchBarStyles } from './SearchBar.styles';

const allNull = Object.fromEntries(Object.keys(productFiltersParsers).map(key => [key, null]));

const SearchBar: React.FC = () => {
  const [, setFilters] = useProductFilters();
  const [localValue, setLocalValue] = useState('');

  const handleSearch = () => {
    setFilters({ ...allNull, name: localValue || null });
  };

  return (
    <Box sx={searchBarStyles.floatingContainer}>
      <TextField
        value={localValue}
        onChange={e => setLocalValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSearch()}
        placeholder="Search products..."
        size="small"
        fullWidth
        sx={searchBarStyles.input}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ cursor: 'pointer' }} onClick={handleSearch} />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export { SearchBar };
