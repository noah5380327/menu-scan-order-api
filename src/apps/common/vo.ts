import { UserEntity } from '../user/entity';
import { StaffEntity } from '../staff/entity';
import { AdminEntity } from '../admin/entity';

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

export class CommonAdminLoginVo {
  constructor(partial: Partial<CommonAdminLoginVo>) {
    Object.assign(this, partial);
  }

  user: AdminEntity;
  token: string;
}
