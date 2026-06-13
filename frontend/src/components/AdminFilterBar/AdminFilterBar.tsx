import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { adminFilterBarStyles } from "./AdminFilterBar.styles";

export interface FilterOption {
  label: string;
  value: string;
}

interface AdminFilterBarProps {
  options: FilterOption[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  search: string;
  onSearchChange: (search: string) => void;
  searchPlaceholder?: string;
}

const AdminFilterBar: React.FC<AdminFilterBarProps> = ({
  options,
  value,
  onValueChange,
  search,
  onSearchChange,
  searchPlaceholder,
}: AdminFilterBarProps) => {
  const [localSearch, setLocalSearch] = useState(search);

  const handleSearch = () => {
    onSearchChange(localSearch.trim());
  };

  return (
    <Box sx={adminFilterBarStyles.container}>
      <Tabs
        value={value}
        onChange={(_, selected) => onValueChange(selected)}
        variant="scrollable"
        scrollButtons="auto"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value={null} label="All" />
        {options.map(option => (
          <Tab key={option.value} value={option.value} label={option.label} />
        ))}
      </Tabs>

      <TextField
        value={localSearch}
        onChange={event => setLocalSearch(event.target.value)}
        onKeyDown={event => event.key === "Enter" && handleSearch()}
        placeholder={searchPlaceholder}
        size="small"
        sx={adminFilterBarStyles.search}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  fontSize="small"
                  sx={adminFilterBarStyles.searchIcon}
                  onClick={handleSearch}
                />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export { AdminFilterBar };
