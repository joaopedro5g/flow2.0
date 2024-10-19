import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { MemberPlans, Role } from 'src/entities/user.entity';
import { RoleGuard } from 'src/guards/roles.guard';
import { SessionGuard } from 'src/guards/session.guard';
import { getEnumType } from 'src/utils/enum-type.util';

export function Auth(...roles: Role[] | MemberPlans[]) {
  return applyDecorators(
    SetMetadata('auth-method', {
      type: getEnumType(roles),
      data: roles,
    }),
    UseGuards(SessionGuard, RoleGuard),
  );
}
