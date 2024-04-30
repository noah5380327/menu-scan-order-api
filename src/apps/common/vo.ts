import { UserEntity } from '../user/entity';

export class CommonLoginVo {
  constructor(partial: Partial<CommonLoginVo>) {
    Object.assign(this, partial);
  }

  user: UserEntity;
  token: string;
}
