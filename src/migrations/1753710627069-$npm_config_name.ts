import { MigrationInterface, QueryRunner, Table } from "typeorm";

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

        const balance = await queryRunner.hasColumn('user', 'balance')
        if (!balance) {
            //@ts-ignore
            await queryRunner.addColumn('user', {
                name: 'balance',
                type: 'numeric',
                default: 0,
                isNullable: true
            })
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.dropColumn('user', 'balance');
        await queryRunner.dropTable('user', true);
    }

}
