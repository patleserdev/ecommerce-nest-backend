import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'michel',
    description: "nom de l'utilisateur",
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: '******',
    description: "Mot de passe de l'utilisateur",
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiProperty({
    example: 'avatar.png',
    description: "Photo de profil de l'utilisateur",
  })
  @IsOptional()
  @IsString()
  profile?: string;
}
