import { BassEntity } from "src/common/abestracs/bass.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { BlogCtaegoryEntity } from "src/modules/blog/entities/bolg-category.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity(EntityName.Category)
export class CategoryEntity extends BassEntity{

  @Column()
  title: string;
  @Column({nullable: true})
    //!اولویت بندی با این مقدار
  priority: number
  @OneToMany(() => BlogCtaegoryEntity, blog => blog.category)
  blog_categories: BlogCtaegoryEntity[];
}
