import { IsEnum, IsOptional, IsInt } from 'class-validator';

export enum AdressRoleType {
  LIVRAISON = 'livraison',
  FACTURATION = 'facturation',
}

export class CreateAddressRoleDto {
  @IsInt()
  adresseId: number;

  @IsEnum(AdressRoleType)
  type: AdressRoleType;

  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  cartId?: number;

  @IsOptional()
  @IsInt()
  orderId?: number;

  @IsOptional()
  @IsInt()
  invoiceId?: number;
}
