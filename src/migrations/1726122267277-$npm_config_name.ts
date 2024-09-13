import { EntityName } from "src/common/enums/entity.enum";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class  $npmConfigName1726122267277 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:EntityName.User,
                columns:[
                    {name:"id",isPrimary:true,type:"serial",isNullable:false},
                    {name:"username",type:"varchar(50)",isNullable:false,isUnique:true},
                    {name:"phone",type:"varchar(12)",isNullable:false,isUnique:true},
                    {name:"email",type:"varchar(100)",isNullable:false,isUnique:true}
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(EntityName.User,true)
    }

}
