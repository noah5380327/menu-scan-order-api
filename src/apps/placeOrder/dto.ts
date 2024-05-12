import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, Min, IsArray } from 'class-validator';

export class PlaceOrderCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  tableName: string;

  @ApiProperty({ type: Number })
  @Min(0)
  totalPrice: number;

  @ApiProperty({ type: Number })
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsArray()
  menus: PlaceOrderMenuCreateDto[];
}

export class PlaceOrderMenuCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  menuName: string;

  @ApiProperty()
  @IsArray()
  items: PlaceOrderMenuItemCreateDto[];
}

export class PlaceOrderMenuItemCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  itemName: string;

  @ApiProperty()
  @IsNotEmpty()
  itemImage: string;

  @ApiProperty({ type: Number })
  @Min(0)
  itemPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  itemDescription: string;

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(1)
  itemCount: number;
}
