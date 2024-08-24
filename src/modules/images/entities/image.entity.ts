import { BassEntity } from "src/common/abestracs/bass.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { UserEntity } from "src/modules/user/entites/user.entity";
import { AfterLoad, Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";

@Entity(EntityName.Images)
export class ImageEntity extends BassEntity {
  @Column()
  name:string
  @Column()
  location:string
  @Column()
  alt:string
  @Column()
  userId:number
  @CreateDateColumn()
  created_at:Date
  @ManyToOne(()=>UserEntity,user=>user.image,{onDelete:"CASCADE"})
  user:UserEntity

  @AfterLoad()
  map(){
    this.location=`http://localhost:3000/${this.location}`
  }
  
}
