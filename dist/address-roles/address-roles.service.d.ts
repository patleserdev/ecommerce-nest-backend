import { Repository } from 'typeorm';
import { AdressRole } from './entities/address-role.entity';
import { CreateAddressRoleDto } from './dto/create-address-role.dto';
import { UpdateAddressRoleDto } from './dto/update-address-role.dto';
export declare class AddressRolesService {
    private readonly addressRoleRepository;
    constructor(addressRoleRepository: Repository<AdressRole>);
    create(createDto: CreateAddressRoleDto): Promise<AdressRole>;
    findAll(): Promise<AdressRole[]>;
    findOne(id: number): Promise<AdressRole>;
    update(id: number, updateDto: UpdateAddressRoleDto): Promise<AdressRole>;
    remove(id: number): Promise<void>;
}
