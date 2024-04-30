import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/bases';

@Entity({ name: 'staff' })
export class StaffEntity extends BaseEntity {
  @Column()
  username: string;

  @Column({ default: true })
  enable: boolean;

  @Column()
  password: string;

  @Column({ default: 0 })
  sort: number;

  @Column({ name: 'user_id' })
  userId: number;
}
