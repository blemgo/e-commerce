import { AuthorizedUser } from 'src/auth/dto/authorized-user.dto';
import { Order } from '../entities/order.entity';

export type AdminOrder = Omit<Order, 'user'> & { user: AuthorizedUser };
