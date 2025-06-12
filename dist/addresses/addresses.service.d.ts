import { Repository } from 'typeorm';
import { Adress } from './entities/address.entity.js';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
export declare class AddressesService {
    private readonly addressRepository;
    constructor(addressRepository: Repository<Adress>);
    create(createAddressDto: CreateAddressDto): Promise<Adress>;
    findAll(): Promise<Adress[]>;
    findAllByUser(userId: number): Promise<Adress[]>;
    findOne(id: number): Promise<Adress>;
    update(id: number, updateDto: UpdateAddressDto): Promise<Adress>;
    remove(id: number): Promise<void>;
}
