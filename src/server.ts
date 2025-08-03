require('express-async-errors');
import * as dotenv from 'dotenv';
import express, { type Request, type Response, json } from 'express';
import { UserDomain } from './core/domain/user-domain/user-domain';
import { UserController } from './service/user.controller';
import cors from 'cors';
import { config, validateEnvVars } from './core/infrastructure/config';
import errorHandler from './core/middlewares';

dotenv.config();

const port = config.BFF_ADMIN_PORT;
const frontendUrl = config.FRONTEND_URL;

// Definição do cors
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-idp-user-id']
};

validateEnvVars();

const userDomain = new UserDomain();
const userController = new UserController(userDomain);

export const app = express();

app.use(json());
app.use(cors(corsOptions));

app.disable('x-powered-by');

//Endpoint que lista os dados de varios usuarios pelo idpUserId
app.get(
  '/users/:idpUserId/company-users',
  async (req: Request, res: Response) => {
    return await userController.getUsers(req, res);
  }
);

//Endpoint que retorna os dados de um usuario pelo userId
app.get('/user/:userId', async (req: Request, res: Response) => {
  return await userController.getUser(req, res);
});

//Endpoint que o admin utiliza para atualizar os dados de um usuario
app.put('/users/admin', async (req: Request, res: Response) => {
  return await userController.updateUserByAdmin(req, res);
});

//Endpoint utilizado para atualizar o colaborador
app.put('/users/collaborator', async (req: Request, res: Response) => {
  return await userController.updateUserByCollaborator(req, res);
});

//Endpoint utilizado para enviar um convite para o usuario
app.post('/users/invite-user', async (req: Request, res: Response) => {
  return await userController.inviteUser(req, res);
});

//Endpoint utilizado para deletar um usuario
app.delete('/users/idp/:userId', async (req: Request, res: Response) => {
  return await userController.deleteUser(req, res);
});

//Endpoint utilizado para deletar um usuario pelo id
app.delete('/users/:userId', async (req: Request, res: Response) => {
  return await userController.deleteUserByUserId(req, res);
});

//Endpoint que o admin utiliza para ativar um usuario

app.post(
  '/users/activate/:userIdpIdToBeActivated',
  async (req: Request, res: Response) => {
    return await userController.activateUserByAdmin(req, res);
  }
);

//Endpoint que o admin utiliza para desativar um usuario
app.post(
  '/users/deactivate/:userIdpIdToBeDeactivated',
  async (req: Request, res: Response) => {
    return await userController.deactivateUserByAdmin(req, res);
  }
);

// Middleware para tratamento de erros
app.use(errorHandler);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`O servidor foi iniciado com sucesso`);
});
