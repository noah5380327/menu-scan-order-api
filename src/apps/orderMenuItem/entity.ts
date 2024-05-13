import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/bases';

@Entity({ name: 'order_menu_item' })
export class OrderMenuItemEntity extends BaseEntity {
  @Column({ name: 'item_name' })
  itemName: string;

  @Column({ name: 'item_image' })
  itemImage: string;

  @Column({ name: 'item_price', type: 'decimal', precision: 10, scale: 2 })
  itemPrice: number;

  @Column({ name: 'item_description' })
  itemDescription: string;

  @Column({ name: 'item_count' })
  itemCount: number;

  @Column({ name: 'order_menu_id' })
  orderMenuId: number;
}
