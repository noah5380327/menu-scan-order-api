import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/bases';

@Entity({ name: 'menu_item' })
export class MenuItemEntity extends BaseEntity {
  @Column({ name: 'menu_id' })
  menuId: string;

  @Column({ name: 'item_id' })
  itemId: string;
}
