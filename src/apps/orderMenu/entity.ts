import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/bases';

@Entity({ name: 'order_menu' })
export class OrderMenuEntity extends BaseEntity {
  @Column({ name: 'menu_name' })
  menuName: string;

  @Column({ name: 'order_id' })
  orderId: number;
}
