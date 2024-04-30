import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class UserQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  username?: string;
}

export class UserCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enable?: boolean;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  sort?: number;
}

export class UserUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  enable?: boolean;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  sort?: number;
}
