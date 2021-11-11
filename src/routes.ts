import { request, response, Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import PermissionController from './controllers/PermissionController';
import RoleController from './controllers/RoleController';
import { is } from './middlewares/permission';

const router =  Router();

router.post('/users', UserController.create)
router.get('/users/roles', UserController.roles)
router.post('/sessions', SessionController.create)
router.post('/permissions', PermissionController.create)
router.post('/roles', RoleController.create)
router.get('/testing', is(['ROLE_ADMIN','ROLE_USER']), (request, response)=>{
  return response.status(200).json({message: 'Authorized'})
})


export { router }

