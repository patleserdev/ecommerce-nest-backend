import { IsOptional, IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ValidateNested } from 'class-validator';
import { CreateAddressRoleDto } from '../../address-roles/dto/create-address-role.dto.js';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  streetAddress: string;

  @IsOptional()
  @IsString()
  streetAddress2?: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  @IsString()
  phoneToDelivery?: string;

  @IsArray()
  @ValidateNested({ each: true })
  roles: CreateAddressRoleDto[] = [];
}
