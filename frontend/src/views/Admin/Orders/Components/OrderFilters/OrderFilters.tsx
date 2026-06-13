import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { OrderStatus } from "@types";
import { ORDER_STATUS_CONFIG } from "@/utils/orderStatus";
import { orderFiltersStyles } from "./OrderFilters.styles";

interface OrderFiltersProps {
  status: OrderStatus | null;
  search: string;
  onStatusChange: (status: OrderStatus | null) => void;
  onSearchChange: (search: string) => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  status,
  search,
  onStatusChange,
  onSearchChange,
}: OrderFiltersProps) => {
  const [localSearch, setLocalSearch] = useState(search);

  const handleSearch = () => {
    onSearchChange(localSearch.trim());
  };

  return (
    <Box sx={orderFiltersStyles.container}>
      <Tabs
        value={status}
        onChange={(_, value) => onStatusChange(value)}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab value={null} label="All" />
        {Object.values(OrderStatus).map(value => (
          <Tab key={value} value={value} label={ORDER_STATUS_CONFIG[value].label} />
        ))}
      </Tabs>

      <TextField
        value={localSearch}
        onChange={event => setLocalSearch(event.target.value)}
        onKeyDown={event => event.key === "Enter" && handleSearch()}
        placeholder="Search by order # or customer"
        size="small"
        sx={orderFiltersStyles.search}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  fontSize="small"
                  sx={orderFiltersStyles.searchIcon}
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

export { OrderFilters };
