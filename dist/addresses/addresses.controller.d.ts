import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtUserPayload } from '../auth/jwt/jwt-user-payload';
import { AddressRolesService } from '../address-roles/address-roles.service';
export declare class AddressesController {
    private readonly addressesService;
    private readonly addressRolesService;
    constructor(addressesService: AddressesService, addressRolesService: AddressRolesService);
    create(req: Request & {
        user: JwtUserPayload;
    }, createAddressDto: CreateAddressDto): Promise<import("./entities/address.entity").Adress>;
    findAll(): Promise<import("./entities/address.entity").Adress[]>;
    findOne(req: Request & {
        user: JwtUserPayload;
    }): Promise<import("./entities/address.entity").Adress[]>;
    findAllByUser(id: string): Promise<import("./entities/address.entity").Adress>;
    update(id: string, updateAddressDto: UpdateAddressDto): Promise<import("./entities/address.entity").Adress>;
    remove(id: string): Promise<void>;
}
