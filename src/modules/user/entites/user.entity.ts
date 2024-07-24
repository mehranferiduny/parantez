import { BassEntity } from "src/common/abestracs/bass.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity(EntityName.User)
export class UserEntity extends BassEntity{

  @Column({unique:true,nullable:true})
  email:string
  @Column({unique:true,nullable:true})
  phone:string
  @Column({unique:true,nullable:true})
  username:string
  @Column({nullable:true})
  password:string

  @CreateDateColumn()
  created_at:Date
  @UpdateDateColumn()
  updated_at:Date

}