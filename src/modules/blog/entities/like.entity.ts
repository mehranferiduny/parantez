import { EntityName } from "src/common/enums/entity.enum";
import { UserEntity } from "src/modules/user/entites/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { BlogEntity } from "./blog.entity";

@Entity(EntityName.BlogLike)
export class BlogLikeEntity{
  @Column()
  userId:number
  @Column()
  blogId:number
   
  @ManyToOne(()=>UserEntity,user=>user.like,{onDelete:"CASCADE"})
  user:UserEntity;
  @ManyToOne(()=>BlogEntity,blog=>blog.like,{onDelete:"CASCADE"})
  blog:BlogEntity;


  @CreateDateColumn()
  created_at:Date
  
}