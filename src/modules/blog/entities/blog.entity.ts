import { BassEntity } from "src/common/abestracs/bass.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { BlogStatus } from "../enums/status.enum";
import { UserEntity } from "src/modules/user/entites/user.entity";
import { BlogLikeEntity } from "./like.entity";
import { BlogBookmarkEntity } from "./bookmark.entity";
import { CommentBlogEntity } from "./comment.entity";
import { BlogCtaegoryEntity } from "./bolg-category.entity";

@Entity(EntityName.Blog)
export class BlogEntity extends BassEntity{
  @Column()
  title:string;
  @Column({unique:true})
  slug:string;
  
  @Column()
  time_for_stady:string;
  
  @Column()
  description:string;
  @Column()
  content:string;
  @Column()
  image:string;
  @Column({default:BlogStatus.Draft})
  status:string;
  @Column()
  authorId:number;
  @ManyToOne(()=>UserEntity,user=>user.blogs,{onDelete:"CASCADE"})
  user:UserEntity;

  @OneToMany(()=>BlogLikeEntity,like=>like.blog)
  likes:BlogLikeEntity[];



  @OneToMany(()=>BlogBookmarkEntity,bookmark=>bookmark.blog,{nullable:true})
  bookmark:BlogBookmarkEntity[];

  @OneToMany(()=>CommentBlogEntity,comment=>comment.blog,{nullable:true})
  comment:CommentBlogEntity[];

  @OneToMany(()=>BlogCtaegoryEntity,cat=>cat.blog,{nullable:true})
  category:BlogCtaegoryEntity[];

  @CreateDateColumn()
  created_at:Date
  @UpdateDateColumn()
  updated_at:Date
}