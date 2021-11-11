import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import { hash } from 'bcryptjs';
import { RoleRepository } from '../repositories/RoleRepository';
import { decode } from 'jsonwebtoken';

class UserController{
    
    async create(request: Request, response: Response){
      const userRepository = getCustomRepository(UserRepository);
      const roleRepository = getCustomRepository(RoleRepository);
      const { name, username, password, roles} = request.body;
      
      const existsUser = await userRepository.findOne({ username});
      if(existsUser){
         return response.status(400).json({message: 'User already exists!'})
      }
      const passwordHashed = await hash(password, 8);

      const existsRoles = await roleRepository.findByIds(roles);
      const user = userRepository.create({
        name,
        username,
        password: passwordHashed,
        roles: existsRoles
      });
  
      await userRepository.save(user);
      delete user.password
  
      return response.status(201).json(user);
    };

    async roles(request: Request, response: Response){
      const authHeader = request.headers.authorization || "";
      const userRepository = await getCustomRepository(UserRepository);
    
      const [, token] = authHeader?.split(" ");
      try {
        
        const payload = decode(token);
  
        if(!payload){
          return response.status(401).json({message: 'Not authorized!'})
        }
        const user = await userRepository.findOne(payload?.sub as string, { relations: ['roles']});
  
        const roles = user?.roles.map((r) => r.name);
        return response.json(roles);
      } catch (error) {
        
        return response.status(400).json({error: "Unexpected error"})
      }
    };


}

export default new UserController() 