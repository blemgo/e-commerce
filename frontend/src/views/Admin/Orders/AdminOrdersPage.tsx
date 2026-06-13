import Box from "@mui/material/Box";
import { AdminHeader } from "@components/AdminHeader";
import { AdminFilterBar } from "@components/AdminFilterBar";
import { PaginatedView } from "@components/PaginatedView";
import { useGetAllOrders } from "@api/hooks/orders/useGetAllOrders";
import { useUpdateOrderStatus } from "@api/hooks/orders/useUpdateOrderStatus";
import { useOrderFilters } from "@api/hooks/orders/useOrderFilters";
import { OrderStatus } from "@types";
import { ORDER_STATUS_CONFIG } from "@/utils/orderStatus";
import { OrderTable } from "./Components/OrderTable";

const STATUS_OPTIONS = Object.values(OrderStatus).map(status => ({
  label: ORDER_STATUS_CONFIG[status].label,
  value: status,
}));

const AdminOrdersPage: React.FC = () => {
  const [filters, setFilters] = useOrderFilters();
  const { paginatedOrders, setPaginatedOrders, loading } = useGetAllOrders(filters);
  const { updateOrderStatus } = useUpdateOrderStatus();

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, status);
      setPaginatedOrders(prev =>
        prev
          ? { ...prev, data: prev.data.map(o => (o.id === orderId ? { ...o, status } : o)) }
          : prev,
      );
    } catch {
      return;
    }
  };

  return (
    <Box>
      <AdminHeader title="Orders" />

      <AdminFilterBar
        options={STATUS_OPTIONS}
        value={filters.status}
        onValueChange={value => setFilters({ status: value as OrderStatus | null, page: 1 })}
        search={filters.search ?? ""}
        onSearchChange={search => setFilters({ search: search || null, page: 1 })}
        searchPlaceholder="Search by order # or customer"
      />

      <PaginatedView
        loading={loading}
        isEmpty={!paginatedOrders?.data.length}
        emptyMessage="No orders found."
        page={paginatedOrders?.page ?? 1}
        totalPages={paginatedOrders?.totalPages ?? 1}
        onPageChange={page => setFilters({ page })}
      >
        <OrderTable orders={paginatedOrders?.data ?? []} onStatusChange={handleStatusChange} />
      </PaginatedView>
    </Box>
  );
};

export { AdminOrdersPage };
