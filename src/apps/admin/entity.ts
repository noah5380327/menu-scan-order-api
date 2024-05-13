import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/bases';

@Entity({ name: 'admin' })
export class AdminEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;
}
