import { AddressRolesService } from './address-roles.service';
import { CreateAddressRoleDto } from './dto/create-address-role.dto';
import { UpdateAddressRoleDto } from './dto/update-address-role.dto';
import { JwtUserPayload } from '../auth/jwt/jwt-user-payload';
export declare class AddressRolesController {
    private readonly addressRolesService;
    constructor(addressRolesService: AddressRolesService);
    create(req: Request & {
        user: JwtUserPayload;
    }, createAddressRoleDto: CreateAddressRoleDto): Promise<import("./entities/address-role.entity").AdressRole>;
    findAll(): Promise<import("./entities/address-role.entity").AdressRole[]>;
    findOne(id: string): Promise<import("./entities/address-role.entity").AdressRole>;
    update(id: string, updateAddressRoleDto: UpdateAddressRoleDto): Promise<import("./entities/address-role.entity").AdressRole>;
    remove(id: string): Promise<void>;
}
