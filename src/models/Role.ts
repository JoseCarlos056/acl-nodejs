
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './Permission';

@Entity("roles")
class Role {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(()=> Permission)
    @JoinTable({
        name: 'permissions_roles',
        joinColumns: [{name: 'roleId'}],
        inverseJoinColumns: [{name: 'permissionId'}]
    })
    permissions: Permission[]
}

export { Role }