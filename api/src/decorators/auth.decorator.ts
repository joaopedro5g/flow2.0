import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from 'src/entities/user.entity';
import { RoleGuard } from 'src/guards/roles.guard';
import { SessionGuard } from 'src/guards/session.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(SessionGuard, RoleGuard),
  );
}
