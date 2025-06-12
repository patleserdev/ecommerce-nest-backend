import { IsEnum, IsOptional, IsInt } from 'class-validator';

export enum AdressRoleType {
  NONE = 'none',
  LIVRAISON = 'livraison',
  FACTURATION = 'facturation',
}

export class CreateAddressRoleDto {
  adresse: { id: number };

  @IsOptional()
  @IsEnum(AdressRoleType)
  type?: AdressRoleType;

  @IsOptional()
  user: { id: number };

  @IsOptional()
  @IsInt()
  cart?: { id: number };

  @IsOptional()
  @IsInt()
  order?: { id: number };

  @IsOptional()
  @IsInt()
  invoice?: { id: number };
}
