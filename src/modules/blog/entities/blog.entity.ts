import { BassEntity } from "src/common/abestracs/bass.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { BlogStatus } from "../enums/status.enum";

@Entity(EntityName.Blog)
export class BlogEntity extends BassEntity{
  @Column()
  title:string;
  @Column()
  description:string;
  @Column()
  content:string;
  @Column()
  image:string;
  @Column({default:BlogStatus.Draft})
  status:string;
  @Column()
  auterId:number;
  @CreateDateColumn()
  created_at:Date
  @UpdateDateColumn()
  updated_at:Date
}