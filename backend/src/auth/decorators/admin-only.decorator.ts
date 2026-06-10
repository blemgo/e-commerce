import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'src/users/entities/enums/role.enum';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from './roles.decorator';

export const AdminOnly = () =>
  applyDecorators(Roles(Role.ADMIN), UseGuards(JwtAuthGuard, RolesGuard));
