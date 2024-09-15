import { EntityName } from "src/common/enums/entity.enum";
import { Roles } from "src/common/enums/roul.enum";
import { UserStatus } from "src/modules/user/enum/status.enum";
import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

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
                    {name:"profileId",type:"int",isNullable:true,isUnique:true}
                ],
                
            })
        ,true)

        // const balance=await queryRunner.hasColumn(EntityName.User,'balance')
        // //@ts-ignore
        // if(!balance) await queryRunner.addColumn(EntityName.User,{name:'balance',type:'numeric',default:0})

        // const username=await queryRunner.hasColumn(EntityName.User,"username")
        // if(username) await queryRunner.changeColumn(EntityName.User,"username",new TableColumn({
        //     name:"username",
        //     type:"varchar(60)",
        //     isNullable:false,
        //     isUnique:true
        // }))

        // await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "mobile" TO "phone"`)

        await queryRunner.createTable(new Table({
            name:EntityName.Profile,
            columns:[
                {name:"id",isPrimary:true,type:"int",isGenerated:true,generationStrategy:"increment"},
                {name:"nik_name",type:"varchar(50)",isNullable:true},
                {name:"bio",type:"varchar",isNullable:true},
                {name:"image_profile",type:"varchar",isNullable:true},
                {name:"userId",type:"int",isNullable:false,isUnique:true}
            ]
        }),true)

        await queryRunner.createForeignKey(EntityName.Profile,new TableForeignKey({
            columnNames:['userId'],
            referencedColumnNames:['id'],
            referencedTableName:EntityName.User,
            onDelete:'CASCADE'
        }) )
        await queryRunner.createForeignKey(EntityName.User,new TableForeignKey({
            columnNames:['profileId'],
            referencedColumnNames:['id'],
            referencedTableName:EntityName.Profile,
            
        }) )

        await queryRunner.createTable(new Table({
            name:EntityName.Blog,
            columns:[
                {name:"id",isPrimary:true,type:"int",isGenerated:true,generationStrategy:"increment"},
                {name:"title",type:"varchar(150)",isNullable:false},
                {name:"content",type:"text",isNullable:false},
                {name:"userId",type:"int",isNullable:false},
               
            ]
        }),true)

        await queryRunner.createForeignKey(EntityName.Blog,new TableForeignKey({
            columnNames:['userId'],
            referencedColumnNames:['id'],
            referencedTableName:EntityName.User,
             onDelete:'CASCADE'
            
        }) )


        await queryRunner.createTable(new Table({
            name:EntityName.Category,
            columns:[
                {name:"id",isPrimary:true,type:"int",isGenerated:true,generationStrategy:"increment"},
                {name:"title",type:"varchar(150)",isNullable:true},
                {name:"blogId",type:"int",isNullable:false}
            ]
        }),true)

        await queryRunner.createForeignKey(EntityName.Category,new TableForeignKey({
            columnNames:['blogId'],
            referencedColumnNames:['id'],
            referencedTableName:EntityName.Blog,
            
        }) )

        await queryRunner.createTable(new Table({
            name:EntityName.Images,
            columns:[
                {name:"id",isPrimary:true,type:"int",isGenerated:true,generationStrategy:"increment"},
                {name:"name",type:"varchar(150)",isNullable:false},
                {name:"location",type:"varchar(150)",isNullable:false},
                {name:"alt",type:"varchar(150)",isNullable:true},
                {name:"userId",type:"int",isNullable:false}
            ]
        }),true)

        await queryRunner.createForeignKey(EntityName.Images,new TableForeignKey({
            columnNames:['userId'],
            referencedColumnNames:['id'],
            referencedTableName:EntityName.User,
            onDelete:'CASCADE'
            
        }) )
        await queryRunner.createTable(new Table({
            name:EntityName.BlogLikes,
            columns:[
                {name:"id",isPrimary:true,type:"int",isGenerated:true,generationStrategy:"increment"},
                
                {name:"userId",type:"int",isNullable:false},
                {name:"blogId",type:"int",isNullable:false}
            ]
        }),true)
        await queryRunner.createTable(new Table({
            name:EntityName.BlogBookmark,
            columns:[
                {name:"id",isPrimary:true,type:"int",isGenerated:true,generationStrategy:"increment"},
                
                {name:"userId",type:"int",isNullable:false},
                {name:"blogId",type:"int",isNullable:false}
            ]
        }),true)

   
        await queryRunner.createForeignKey(EntityName.BlogLikes,new TableForeignKey({
            columnNames:['userId'],
            referencedColumnNames:['id'],
            referencedTableName:EntityName.User,
            onDelete:'CASCADE'
            
        }) )
        await queryRunner.createForeignKey(EntityName.BlogLikes,new TableForeignKey({
            columnNames:['blogId'],
            referencedColumnNames:['id'],
            referencedTableName:EntityName.Blog,
            onDelete:'CASCADE'
            
        }) )
        await queryRunner.createForeignKey(EntityName.BlogBookmark,new TableForeignKey({
            columnNames:['userId'],
            referencedColumnNames:['id'],
            referencedTableName:EntityName.User,
            onDelete:'CASCADE'
            
        }) )
        await queryRunner.createForeignKey(EntityName.BlogBookmark,new TableForeignKey({
            columnNames:['blogId'],
            referencedColumnNames:['id'],
            referencedTableName:EntityName.Blog,
            onDelete:'CASCADE'
            
        }) )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropColumn(EntityName.User,"balance")
        const profile=await queryRunner.getTable(EntityName.Profile)
        if(profile){
        const userFK=profile.foreignKeys.find(fk=>fk.columnNames.indexOf('userId') !== -1)
        if(userFK) await queryRunner.dropForeignKey(EntityName.Profile,userFK)
        }

        const images=await queryRunner.getTable(EntityName.Images)
        if(images){
        const userImageFK=images.foreignKeys.find(fk=>fk.columnNames.indexOf('userId') !== -1)
        if(userImageFK) await queryRunner.dropForeignKey(EntityName.Images,userImageFK)
        }

        const user=await queryRunner.getTable(EntityName.User)
        if(user){
            const profileFK=user.foreignKeys.find(fk=>fk.columnNames.indexOf('profileId') !== -1)
            if(profileFK) await queryRunner.dropForeignKey(EntityName.User,profileFK)
        }

        const blog=await queryRunner.getTable(EntityName.Blog)
        if(blog){
            const bloguserFK=user.foreignKeys.find(fk=>fk.columnNames.indexOf('userId') !== -1)
            if(bloguserFK) await queryRunner.dropForeignKey(EntityName.Blog,bloguserFK)
        }

        const category=await queryRunner.getTable(EntityName.Category)
        if(category){
            const catFK=category.foreignKeys.find(fk=>fk.columnNames.indexOf('blogId') !== -1)
            if(catFK) await queryRunner.dropForeignKey(EntityName.Category,catFK)
        }


        const likeuser=await queryRunner.getTable(EntityName.BlogLikes)
        if(likeuser){
            const likeFK=likeuser.foreignKeys.find(fk=>fk.columnNames.indexOf('userId') !== -1)
            if(likeFK) await queryRunner.dropForeignKey(EntityName.BlogLikes,likeFK)
        }
   
        const likeblog=await queryRunner.getTable(EntityName.BlogLikes)
        if(likeblog){
            const likeFK=likeblog.foreignKeys.find(fk=>fk.columnNames.indexOf('blogId') !== -1)
            if(likeFK) await queryRunner.dropForeignKey(EntityName.BlogLikes,likeFK)
        }

        const bookmarkuser=await queryRunner.getTable(EntityName.BlogBookmark)
        if(bookmarkuser){
            const bookmarkFK=bookmarkuser.foreignKeys.find(fk=>fk.columnNames.indexOf('userId') !== -1)
            if(bookmarkFK) await queryRunner.dropForeignKey(EntityName.BlogBookmark,bookmarkFK)
        }
   
        const bookmarkblog=await queryRunner.getTable(EntityName.BlogBookmark)
        if(bookmarkblog){
            const bookmarkFK=bookmarkblog.foreignKeys.find(fk=>fk.columnNames.indexOf('blogId') !== -1)
            if(bookmarkFK) await queryRunner.dropForeignKey(EntityName.BlogLikes,bookmarkFK)
        }

        await queryRunner.dropTable(EntityName.Images,true)
        await queryRunner.dropTable(EntityName.BlogLikes,true)
        await queryRunner.dropTable(EntityName.BlogBookmark,true)
        await queryRunner.dropTable(EntityName.Category,true)
        await queryRunner.dropTable(EntityName.Blog,true)
        await queryRunner.dropTable(EntityName.Profile,true)
        await queryRunner.dropTable(EntityName.User,true)
    }

}
