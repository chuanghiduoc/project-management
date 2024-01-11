import { EntityRepository, Repository } from 'typeorm';
import { Permission } from './permission.entity';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
  // Custom repository methods can be added here
}
