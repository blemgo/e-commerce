import { Brackets, SelectQueryBuilder } from 'typeorm';
import { Order } from '../entities/order.entity';
import { GetAllOrdersQueryDto } from '../dto/get-all-orders-query.dto';

export const applyQuery = (
  qb: SelectQueryBuilder<Order>,
  query: GetAllOrdersQueryDto,
): void => {
  const STATUS_QUERY = 'order.status = :status';
  const TRACKING_QUERY = 'order.trackingId ILIKE :search';
  const CUSTOMER_QUERY = 'user.fullName ILIKE :search';

  if (query.status) {
    qb.andWhere(STATUS_QUERY, { status: query.status });
  }

  if (query.search) {
    qb.andWhere(
      new Brackets((b) => {
        b.where(TRACKING_QUERY).orWhere(CUSTOMER_QUERY);
      }),
      { search: `%${query.search}%` },
    );
  }
};
