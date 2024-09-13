import { EntityName } from "src/common/enums/entity.enum";
import { Roles } from "src/common/enums/roul.enum";
import { UserStatus } from "src/modules/user/enum/status.enum";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class  $npmConfigName1726122267277 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:EntityName.User,
                columns:[
                    {name:"id",isPrimary:true,type:"serial",isNullable:false},
                    {name:"username",type:"varchar(50)",isNullable:true,isUnique:true},
                    {name:"phone",type:"varchar(12)",isNullable:true,isUnique:true},
                    {name:"email",type:"varchar(100)",isNullable:true,isUnique:true},
                    {name:"new_email",type:"varchar",isNullable:true},
                    {name:"new_phone",type:"varchar",isNullable:true},
                    {name:"veryfay_email",type:"boolean",isNullable:true,default:false},
                    {name:"veryfay_phone",type:"boolean",isNullable:true,default:false},
                    {name:"password",type:"varchar(20)",isNullable:true},
                    {name:"roles",type:"enum",enum:[Roles.Admin,Roles.User],isNullable:false},
                    {name:"status",type:"enum",enum:[UserStatus.Active,UserStatus.Block,UserStatus.Report],isNullable:true},
                    {name:"created_at",type:"timestamp",default:"now()"},
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(EntityName.User,true)
    }

}
