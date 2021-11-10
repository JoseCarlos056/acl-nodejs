
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './Role';

@Entity("users")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password?: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(()=> Role)
    @JoinTable({
        name: 'users_roles',
        joinColumns: [{name: 'userId'}],
        inverseJoinColumns: [{name: 'roleId'}]
    })
    roles: Role[]
}

export { User }