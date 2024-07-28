import { BassEntity } from "src/common/abestracs/bass.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, Entity, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity(EntityName.Profile)
export class ProfileEntity extends BassEntity{
   @Column()
   nik_name:string
   @Column({nullable:true})
   bio:string
   @Column({nullable:true})
   imag_profile:string
   @Column({nullable:true})
   bg_Image:string
   @Column({nullable:true})
   gander:string
   @Column({nullable:true})
   linkdin_profile:string
   @Column({nullable:true})
   x_profile:string
   @Column({nullable:true})
   birthday:Date
   @Column()
   userId:number
   @OneToOne(()=>UserEntity,(user)=>user.profile,{onDelete:"CASCADE"})
   user:UserEntity

   
   
}