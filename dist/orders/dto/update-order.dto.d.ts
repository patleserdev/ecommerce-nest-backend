import { CreateOrderDto } from './create-order.dto';
declare const UpdateOrderStatusDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOrderDto>>;
export declare class UpdateOrderStatusDto extends UpdateOrderStatusDto_base {
    status: string;
}
export {};
