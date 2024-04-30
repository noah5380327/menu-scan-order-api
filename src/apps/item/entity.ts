import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/bases';

@Entity({ name: 'item' })
export class ItemEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  description: string;

  @Column({ default: true })
  enable: boolean;

  @Column({ default: 0 })
  sort: number;

  @Column({ name: 'user_id' })
  userId: number;
}
