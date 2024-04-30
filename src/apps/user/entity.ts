import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/bases';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column({ default: true })
  enable: boolean;

  @Column()
  password: string;
}
