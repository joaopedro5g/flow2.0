import { MemberPlans, Role } from 'src/entities/user.entity';

export function getEnumType(value: any): 'role' | 'plan' | 'unknown' {
  if (Array.isArray(value)) {
    if (value.every((item) => Object.values(Role).includes(item))) {
      return 'role';
    }
    if (value.every((item) => Object.values(MemberPlans).includes(item))) {
      return 'plan';
    }
  }
  return 'unknown'; // Se não for nem 'role' nem 'plan'
}
