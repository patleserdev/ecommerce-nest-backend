import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'michel@hotmal.fr',
    description: "adresse mail de l'utilisateur",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '********',
    description: "mot de passe de l'utilisateur",
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'customer',
    description: "Rôle de l'utilisateur",
  })
  @IsNotEmpty()
  role: string; // 'admin' or 'customer'
}
