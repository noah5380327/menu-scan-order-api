import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CommonLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class CommonRegisterDto extends CommonLoginDto {}

export class CommonStaffLoginDto extends CommonLoginDto {}
