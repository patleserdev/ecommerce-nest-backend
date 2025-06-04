export declare enum AdressRoleType {
    LIVRAISON = "livraison",
    FACTURATION = "facturation"
}
export declare class CreateAddressRoleDto {
    adresseId: number;
    type: AdressRoleType;
    userId?: number;
    cartId?: number;
    orderId?: number;
    invoiceId?: number;
}
