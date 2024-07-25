import { BassEntity } from "src/common/abestracs/bass.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, Entity, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity(EntityName.Otp)
export class OtpEntity extends BassEntity{
   @Column()
   code:string
   @Column()
   expiresIn:Date
   @Column()
   userId:string
   @OneToOne(()=>UserEntity,(user)=>user.otp,{onDelete:"CASCADE"})
   user:UserEntity
   
   
}