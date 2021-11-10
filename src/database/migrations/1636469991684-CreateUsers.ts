import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1636469991684 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
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
                     name:'username',
                     type: 'varchar'
                 },
                 {
                     name:'password',
                     type: 'varchar'
                 },
                 {
                     name:'createdAt',
                     type:'timestamp',
                     default: 'now()'
                 }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
