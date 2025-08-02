import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class Migrations1753710627069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    { name: "id", isPrimary: true, type: 'serial', isNullable: false },
                    { name: "username", type: 'character varying(50)', isNullable: true, isUnique: true },
                    { name: "phone", type: 'character varying(12)', isNullable: true, isUnique: true },
                    { name: "email", type: 'character varying(100)', isNullable: true, isUnique: true },
                    { name: "role", type: 'enum', enum: ['admin', 'user'] },
                    { name: "status", type: 'enum', enum: ['block', 'report'], isNullable: true },
                    { name: "profileId", type: 'int', isUnique: true, isNullable: true },
                    { name: "new_email", type: 'varchar', isNullable: true },
                    { name: "new_phone", type: 'varchar', isNullable: true },
                    { name: "verify_phone", type: 'boolean', isNullable: true, default: false },
                    { name: "verify_email", type: 'boolean', isNullable: true, default: false },
                    { name: "password", type: 'varchar(20)', isNullable: true },
                    { name: "created_at", type: 'timestamp', default: "now()" },
                ]
            }),
            true
        );

        // const balance = await queryRunner.hasColumn('user', 'balance')
        // const username = await queryRunner.hasColumn('user', 'username')
        // if (!balance) {
        //     //@ts-ignore
        //     await queryRunner.addColumn('user', {
        //         name: 'balance',
        //         type: 'numeric',
        //         default: 0,
        //         isNullable: true
        //     })
        // }
        // if (username) {
        //     await queryRunner.changeColumn('user', 'username', new TableColumn({
        //         name: 'username',
        //         isNullable: false,
        //         isUnique: true,
        //         type: 'varchar(50)'
        //     }))
        // }

        // update with sql
        // await queryRunner.query(`
        //     ALTER TABLE "user" RENAME COLUMN "mobile" TO "phone"
        // `)

        await queryRunner.createTable(new Table({
            name: 'profile',
            columns: [
                { name: "id", type: 'int', isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "nick_name", type: 'varchar(50)', isNullable: true },
                { name: "bio", type: 'varchar', isNullable: true },
                { name: "image_profile", type: 'varchar', isNullable: true },
                { name: "userId", type: 'int', isNullable: false, isUnique: true },
            ]
        }), true);

        // relation
        await queryRunner.createForeignKey('profile', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: "CASCADE"
        }))

        await queryRunner.createForeignKey('user', new TableForeignKey({
            columnNames: ['profileId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'profile'
        }))

        await queryRunner.createTable(new Table({
            name: 'blog',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'title', type: 'varchar(150)', isNullable: false },
                { name: 'content', type: 'text', isNullable: false },
                { name: 'userId', type: 'int', isNullable: false }
            ]
        }), true);

        await queryRunner.createForeignKey('blog', new TableForeignKey({
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: "CASCADE"
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropColumn('user', 'balance');
        const profile = await queryRunner.getTable("profile");
        if (profile) {
            const userFK = profile?.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
            if (userFK) await queryRunner.dropForeignKey('profile', userFK);
        }

        const user = await queryRunner.getTable("user");
        if (user) {
            const profileFK = user?.foreignKeys.find(fk => fk.columnNames.indexOf('profileId') !== -1);
            if (profileFK) await queryRunner.dropForeignKey('user', profileFK);
        }

        const blog = await queryRunner.getTable("blog");
        if (blog) {
            const userBlogFK = blog?.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
            if (userBlogFK) await queryRunner.dropForeignKey('blog', userBlogFK);
        }

        await queryRunner.dropTable('blog', true);
        await queryRunner.dropTable('profile', true);
        await queryRunner.dropTable('user', true);
    }

}
