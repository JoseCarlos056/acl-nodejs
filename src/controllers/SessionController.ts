import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { sign } from 'jsonwebtoken';
import { compare } from "bcryptjs";

class SessionController {
      async create (request: Request, response: Response){
          const { username, password} = request.body;

          const userRepository = getCustomRepository(UserRepository);

          const user = await userRepository.findOne({ username});

          if(!user) {
            return response.status(400).json({error: 'User not found!'})
          }  
          if(user.password){

            const matchPassowrd = await compare(password, user.password);
  
            if(!matchPassowrd){
              return response.status(400).json({error: 'Incorrect password or username'})
            }
  
            const token  = sign({}, '698dc19d489c4e4db73e28a713eab07b',{
              subject: user.id,
              expiresIn: '1d'
            });
            delete user.password;
            return response.status(200).json({
              token,
              user
            })
          }

      }
}

export default new SessionController();