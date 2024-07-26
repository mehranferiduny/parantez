import { UserEntity } from "src/modules/user/entites/user.entity";

declare global{
  namespace Express{
    interface Request{
      user?:UserEntity
    }
  }
}

