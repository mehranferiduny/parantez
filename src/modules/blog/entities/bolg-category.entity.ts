import { BassEntity } from "src/common/abestracs/bass.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { BlogEntity } from "./blog.entity";
import { CategoryEntity } from "src/modules/category/entities/category.entity";

@Entity(EntityName.BlogCategory)
export class BlogCtaegoryEntity extends BassEntity{
  @Column()
    blogId: number;
    @Column({nullable:false})
    categoryId: number;
    @ManyToOne(() => BlogEntity, blog => blog.categoris, {onDelete: "CASCADE"})
    blog: BlogEntity
    @ManyToOne(() => CategoryEntity, category => category.blog_categories, {onDelete: "CASCADE"})
    category: CategoryEntity
}