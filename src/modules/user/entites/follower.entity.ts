import { BassEntity } from "src/common/abestracs/bass.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity(EntityName.Follower)
export class FollowerEntity extends BassEntity{
  @Column()
  followerId:number
  @Column()
  followeingId:number
  @ManyToOne(()=>UserEntity,user=>user.follower,{onDelete:"CASCADE"})
  follower:UserEntity;
  @ManyToOne(()=>UserEntity,user=>user.followeing,{onDelete:"CASCADE"})
  followeing:UserEntity;
  @CreateDateColumn()
  created_at=Date
}