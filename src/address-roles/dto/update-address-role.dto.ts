import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressRoleDto } from './create-address-role.dto';

export class UpdateAddressRoleDto extends PartialType(CreateAddressRoleDto) {}
