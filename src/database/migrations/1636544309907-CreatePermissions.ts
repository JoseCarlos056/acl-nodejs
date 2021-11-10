import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePermissions1636544309907 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'permissions',
            columns: [
                {
                    name:'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                } ,
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name:'createdAt',
                    type:'timestamp',
                    default: 'now()'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('permissions');
    }

}
