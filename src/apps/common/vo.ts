import { UserEntity } from '../user/entity';
import { StaffEntity } from '../staff/entity';

export class CommonLoginVo {
  constructor(partial: Partial<CommonLoginVo>) {
    Object.assign(this, partial);
  }

  user: UserEntity;
  token: string;
}

export class CommonStaffLoginVo {
  constructor(partial: Partial<CommonStaffLoginVo>) {
    Object.assign(this, partial);
  }

  user: StaffEntity;
  token: string;
}
