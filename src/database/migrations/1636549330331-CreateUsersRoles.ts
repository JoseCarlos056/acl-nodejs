import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUsersRoles1636549330331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users_roles',
            columns: [
                {
                    name: 'roleId',
                    type: 'varchar',
                },
                {
                    name: 'userId',
                    type: 'varchar',
                },
                
            ]
        }));
        await queryRunner.createForeignKey(
            'users_roles', new TableForeignKey({
                columnNames:['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                name:'fk_users_roles_',
                onDelete: 'CASCADE',
            })
        );
        await queryRunner.createForeignKey(
            'users_roles', new TableForeignKey({
                columnNames:['roleId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'roles',
                name:'fk_roles_users_',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_roles','fk_users_roles_')
        await queryRunner.dropForeignKey('users_roles','fk_roles_users_')
        await queryRunner.dropTable('users_roles');
    }

}
