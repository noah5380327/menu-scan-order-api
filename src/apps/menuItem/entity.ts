import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/bases';

@Entity({ name: 'menu_item' })
export class MenuItemEntity extends BaseEntity {
  @Column({ name: 'menu_id' })
  menuId: number;

  @Column({ name: 'item_id' })
  itemId: number;

  @Column({ name: 'user_id' })
  userId: number;
}
