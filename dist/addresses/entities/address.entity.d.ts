import { AdressRole } from '../../address-roles/entities/address-role.entity';
export declare class Adress {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    streetAddress: string;
    streetAddress2?: string;
    postalCode: string;
    city: string;
    country: string;
    phoneToDelivery?: string;
    roles: AdressRole[];
}
