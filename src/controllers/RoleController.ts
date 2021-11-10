import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { PermissionRepository } from "../repositories/PermissionRepository";
import { RoleRepository } from "../repositories/RoleRepository";


class RoleController{

    async create(request: Request, response: Response){

      const roleRepository = getCustomRepository(RoleRepository)
      const permissionRepository = getCustomRepository(PermissionRepository)

      const { name, description, permissions }= request.body;

      const existsRole = await roleRepository.findOne({name});

      if(existsRole){
        return response.status(400).json({ error: "Role already exists!"})
      }
      const existsPermissions = await permissionRepository.findByIds(permissions);


      const role = roleRepository.create({ name, description, permissions: existsPermissions });

        
      await roleRepository.save(role)
      
      return response.json(role)

    }

}

export default new RoleController()