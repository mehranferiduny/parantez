import { BassEntity } from "src/common/abestracs/bass.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, UpdateDateColumn } from "typeorm";
import { OtpEntity } from "./otp.entity";
import { ProfileEntity } from "./profile.entity";
import { BlogEntity } from "src/modules/blog/entities/blog.entity";
import { BlogLikeEntity } from "src/modules/blog/entities/like.entity";
import { BlogBookmarkEntity } from "src/modules/blog/entities/bookmark.entity";
import { CommentBlogEntity } from "src/modules/blog/entities/comment.entity";
import { ImageEntity } from "src/modules/images/entities/image.entity";
import { Roles } from "src/common/enums/roul.enum";
import { FollowerEntity } from "./follower.entity";
import { UserStatus } from "../enum/status.enum";

@Entity(EntityName.User)
export class UserEntity extends BassEntity{

  @Column({unique:true,nullable:true})
  email:string
  @Column({nullable:true})
  new_email:string
  @Column({nullable:true,default:false})
  verify_email:boolean
  @Column({unique:true,nullable:true})
  phone:string
  @Column({nullable:true})
  new_phone:string
  @Column({nullable:true,type:'numeric',default:0})
  balance:number
  @Column({nullable:true,default:false})
  verify_phone:boolean
  @Column({unique:true,nullable:true})
  username:string
  @Column({default:Roles.User})
  roles:string
  @Column({default:UserStatus.Active})
  status:string
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

   @OneToMany(()=>BlogEntity,blog=>blog.author,{nullable:true})
   blogs:BlogEntity[];

   @OneToMany(()=>BlogLikeEntity,like=>like.user)
   blog_like:BlogLikeEntity[];


   @OneToMany(()=>BlogBookmarkEntity,bookmark=>bookmark.user,{nullable:true})
   bookmark:BlogBookmarkEntity[];

   @OneToMany(()=>CommentBlogEntity,comment=>comment.user,{nullable:true})
   comment:CommentBlogEntity[];

   @OneToMany(()=>ImageEntity,image=>image.user,{nullable:true})
   image:ImageEntity[];

   @OneToMany(()=>FollowerEntity,follow=>follow.followeing,{nullable:true})
   follower:FollowerEntity[];
   @OneToMany(()=>FollowerEntity,follow=>follow.follower,{nullable:true})
   followeing:FollowerEntity[];

  @CreateDateColumn()
  created_at:Date
  @UpdateDateColumn()
  updated_at:Date

}