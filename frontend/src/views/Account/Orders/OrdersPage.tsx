import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { LoadingScreen } from '@components/LoadingScreen';
import { OrderStatusChip } from '@components/OrderStatusChip';
import { useGetOrders } from '@api/hooks/orders/useGetOrders';
import { formatDate } from '@/utils/formatDate';
import type { Order } from '@types';
import { ordersPageStyles } from './OrdersPage.styles';

const itemCount = (order: Order): number =>
  order.items.reduce((sum, item) => sum + item.quantity, 0);

const OrdersPage = () => {
  const { orders, loading } = useGetOrders();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={ordersPageStyles.container}>
      <Typography variant="h4" sx={ordersPageStyles.title}>
        Orders &amp; tracking
      </Typography>

      {orders.length === 0 ? (
        <Typography sx={ordersPageStyles.empty}>
          You haven&apos;t placed any orders yet.
        </Typography>
      ) : (
        <Box sx={ordersPageStyles.tableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map(order => {
                const count = itemCount(order);

                return (
                  <TableRow
                    key={order.id}
                    hover
                    onClick={() => navigate(`/account/orders/${order.id}`)}
                    sx={ordersPageStyles.row}
                  >
                    <TableCell>
                      <Box sx={ordersPageStyles.orderCell}>
                        {order.items[0]?.product?.productImage && (
                          <Box
                            component="img"
                            src={order.items[0].product?.productImage}
                            alt=""
                            sx={ordersPageStyles.thumbnail}
                          />
                        )}
                        <Typography sx={ordersPageStyles.trackingId}>
                          {order.trackingId}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>
                      {count} item{count === 1 ? '' : 's'}
                    </TableCell>
                    <TableCell>€{order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell align="right">
                      <OrderStatusChip status={order.status} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export { OrdersPage };
