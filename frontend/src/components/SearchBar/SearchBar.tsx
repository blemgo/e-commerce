import { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useProductFilters, productFiltersParsers } from '@api/hooks/products/useProductFilters';
import { searchBarStyles } from './SearchBar.styles';

const allNull = Object.fromEntries(Object.keys(productFiltersParsers).map(key => [key, null]));

const SearchBar = () => {
  const [, setFilters] = useProductFilters();
  const [localValue, setLocalValue] = useState('');

  const handleSearch = () => {
    setFilters({ ...allNull, name: localValue || null });
  };

  return (
    <TextField
      value={localValue}
      onChange={e => setLocalValue(e.target.value)}
      onKeyDown={e => e.key === 'Enter' && handleSearch()}
      placeholder="Search products..."
      size="small"
      color="secondary"
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
  );
};

export { SearchBar };
