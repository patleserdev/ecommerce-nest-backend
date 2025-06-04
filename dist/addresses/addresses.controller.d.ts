import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressesController {
    private readonly addressesService;
    constructor(addressesService: AddressesService);
    create(createAddressDto: CreateAddressDto): Promise<import("./entities/address.entity").Adress>;
    findAll(): Promise<import("./entities/address.entity").Adress[]>;
    findOne(id: string): Promise<import("./entities/address.entity").Adress>;
    update(id: string, updateAddressDto: UpdateAddressDto): Promise<import("./entities/address.entity").Adress>;
    remove(id: string): Promise<void>;
}
