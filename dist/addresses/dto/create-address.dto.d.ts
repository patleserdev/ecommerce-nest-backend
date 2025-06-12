import { CreateAddressRoleDto } from '../../address-roles/dto/create-address-role.dto.js';
export declare class CreateAddressDto {
    title: string;
    firstName: string;
    lastName: string;
    streetAddress: string;
    streetAddress2?: string;
    postalCode: string;
    city: string;
    country: string;
    phoneToDelivery?: string;
    roles: CreateAddressRoleDto[];
}
