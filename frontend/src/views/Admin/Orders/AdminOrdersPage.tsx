import { useState } from "react";
import Box from "@mui/material/Box";
import { AdminHeader } from "@components/AdminHeader";
import { PaginatedView } from "@components/PaginatedView";
import { useGetAllOrders } from "@api/hooks/orders/useGetAllOrders";
import { useUpdateOrderStatus } from "@api/hooks/orders/useUpdateOrderStatus";
import type { OrderStatus } from "@types";
import { OrderTable } from "./Components/OrderTable";

const AdminOrdersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { paginatedOrders, setPaginatedOrders, loading } = useGetAllOrders({ page });
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

      <PaginatedView
        loading={loading}
        isEmpty={!paginatedOrders?.data.length}
        emptyMessage="No orders found."
        page={paginatedOrders?.page ?? 1}
        totalPages={paginatedOrders?.totalPages ?? 1}
        onPageChange={setPage}
      >
        <OrderTable orders={paginatedOrders?.data ?? []} onStatusChange={handleStatusChange} />
      </PaginatedView>
    </Box>
  );
};

export { AdminOrdersPage };
