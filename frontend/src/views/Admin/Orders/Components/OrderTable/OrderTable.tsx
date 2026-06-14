import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { OrderStatusSelect } from "@components/OrderStatusSelect";
import type { Order, OrderStatus } from "@types";
import { orderTableStyles } from "./OrderTable.styles";

interface OrderTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });

const countItems = (order: Order): number =>
  order.items.reduce((total, item) => total + item.quantity, 0);

const OrderTable: React.FC<OrderTableProps> = ({ orders, onStatusChange }: OrderTableProps) => {
  return (
    <TableContainer sx={orderTableStyles.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={orderTableStyles.headCell}>Order</TableCell>
            <TableCell sx={orderTableStyles.headCell}>Customer</TableCell>
            <TableCell sx={orderTableStyles.headCell}>Date</TableCell>
            <TableCell sx={orderTableStyles.headCell}>Items</TableCell>
            <TableCell sx={orderTableStyles.headCell}>Total</TableCell>
            <TableCell sx={orderTableStyles.headCell}>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id} hover>
              <TableCell>
                <Typography sx={orderTableStyles.trackingId}>{order.trackingId}</Typography>
              </TableCell>

              <TableCell>{order.user?.fullName ?? "—"}</TableCell>

              <TableCell>{formatDate(order.createdAt)}</TableCell>

              <TableCell>{countItems(order)}</TableCell>

              <TableCell>
                <Typography sx={orderTableStyles.total}>{`₪${order.totalAmount}`}</Typography>
              </TableCell>

              <TableCell>
                <OrderStatusSelect
                  status={order.status}
                  onChange={status => onStatusChange(order.id, status)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { OrderTable };
