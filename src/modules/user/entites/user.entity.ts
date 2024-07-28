import { BassEntity } from "src/common/abestracs/bass.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";
import { OtpEntity } from "./otp.entity";
import { ProfileEntity } from "./profile.entity";

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
  @Column({nullable:true})
   otpId:number
   @OneToOne(()=>OtpEntity,(otp)=>otp.user,{nullable:true})
   @JoinColumn({name:"otpId"})
   otp:OtpEntity

   @Column({nullable:true})
   profileId:number
   @OneToOne(()=>ProfileEntity,(profile)=>profile.user,{nullable:true})
   @JoinColumn({name:"profileId"})
   profile:ProfileEntity

  @CreateDateColumn()
  created_at:Date
  @UpdateDateColumn()
  updated_at:Date

}