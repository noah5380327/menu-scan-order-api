import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { MomentUtil } from '../util';

export class BaseEntity {
  @ApiProperty({ description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String, description: 'Create Time' })
  @CreateDateColumn({ name: 'created_at' })
  @Transform(({ value }) => MomentUtil.dateTimeFormat(value))
  createdAt: Date;

  @ApiProperty({ type: String, description: 'Update Time' })
  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(({ value }) => MomentUtil.dateTimeFormat(value))
  updatedAt: Date;
}
