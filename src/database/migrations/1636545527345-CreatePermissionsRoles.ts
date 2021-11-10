import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePermissionsRoles1636545527345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'permissions_roles',
            columns: [
                {
                    name: 'roleId',
                    type: 'varchar',
                },
                {
                    name: 'permissionId',
                    type: 'varchar',
                },
                
            ]
        }));
        await queryRunner.createForeignKey(
            'permissions_roles', new TableForeignKey({
                columnNames:['permissionId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'permissions',
                name:'fk_permissions_roles_',
                onDelete: 'CASCADE',
            })
        );
        await queryRunner.createForeignKey(
            'permissions_roles', new TableForeignKey({
                columnNames:['roleId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'roles',
                name:'fk_roles_permissions_',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('permissions_roles','fk_permissions_roles_')
        await queryRunner.dropForeignKey('permissions_roles','fk_roles_permissions_')
        await queryRunner.dropTable('permissions_roles');
    }

}
