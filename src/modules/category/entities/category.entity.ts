import { BassEntity } from "src/common/abestracs/bass.entity";
import { EntityName } from "src/common/enums/entity.enum";
import { Column, Entity } from "typeorm";

@Entity(EntityName.Category)
export class CategoryEntity extends BassEntity{
  @Column()
  title:string;
  @Column({nullable:true})
  priority:number
}
