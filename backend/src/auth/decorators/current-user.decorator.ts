import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthorizedUser } from '../dto/authorized-user.dto';

export const CurrentUser = createParamDecorator(
  (
    data: keyof AuthorizedUser | undefined,
    ctx: ExecutionContext,
  ): AuthorizedUser | AuthorizedUser[keyof AuthorizedUser] => {
    const user = ctx.switchToHttp().getRequest().user as AuthorizedUser;

    return data ? user[data] : user;
  },
);
