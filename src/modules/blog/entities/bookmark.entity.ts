import { EntityName } from "src/common/enums/entity.enum";
import { UserEntity } from "src/modules/user/entites/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { BlogEntity } from "./blog.entity";
import { BassEntity } from "src/common/abestracs/bass.entity";

@Entity(EntityName.BlogBookmark)
export class BlogBookmarkEntity extends BassEntity{
  @Column()
  userId:number
  @Column()
  blogId:number
   
  @ManyToOne(()=>UserEntity,user=>user.bookmark,{onDelete:"CASCADE"})
  user:UserEntity;
  @ManyToOne(()=>BlogEntity,blog=>blog.bookmark,{onDelete:"CASCADE"})
  blog:BlogEntity;


  @CreateDateColumn()
  created_at:Date
  
}