import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/bases';

@Entity({ name: 'menu' })
export class MenuEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: true })
  enable: boolean;

  @Column({ default: 0 })
  sort: number;

  @Column({ name: 'user_id' })
  userId: number;
}
