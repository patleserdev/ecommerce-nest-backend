export declare enum AdressRoleType {
    NONE = "none",
    LIVRAISON = "livraison",
    FACTURATION = "facturation"
}
export declare class CreateAddressRoleDto {
    adresse: {
        id: number;
    };
    type?: AdressRoleType;
    user: {
        id: number;
    };
    cart?: {
        id: number;
    };
    order?: {
        id: number;
    };
    invoice?: {
        id: number;
    };
}
