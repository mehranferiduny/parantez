import { BassEntity } from "src/common/abestracs/bass.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { UserEntity } from "src/modules/user/entites/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BlogEntity } from "./blog.entity";


@Entity(EntityName.BlogComments)
export class CommentBlogEntity extends BassEntity{
  @Column()
  text:string;
  @Column({default:true})
  acseped:boolean;
  @Column()
  blogId:number;
  @Column()
  userId:number;
  @Column()
  parentId:number;

  // @ManyToOne(()=>UserEntity,user=>user.comment,{onDelete:"CASCADE"})
  // user:UserEntity;

  // @ManyToOne(()=>BlogEntity,blog=>blog.comment,{onDelete:"CASCADE"})
  // blog:BlogEntity;

  @ManyToOne(()=>CommentBlogEntity,comment=>comment.chiled,{onDelete:"CASCADE"})
  parent:CommentBlogEntity;

  @OneToMany(()=>CommentBlogEntity,chiled=>chiled.parent,{nullable:true})
  @JoinColumn({name:"parent"})
  chiled:CommentBlogEntity;



  @CreateDateColumn()
  created_at:Date
}