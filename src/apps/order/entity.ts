import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/bases';

@Entity({ name: 'order' })
export class OrderEntity extends BaseEntity {
  @Column()
  note: string;

  @Column({ name: 'table_name' })
  tableName: string;

  @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column()
  status: string;

  @Column({ name: 'user_id' })
  userId: number;
}
