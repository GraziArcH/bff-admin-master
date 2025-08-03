import { type Request, type Response } from 'express';
import { ArchFramework } from 'versatus-arch-framework/arch-framework';
import {
  activateUserByAdminSchema,
  deactivateUserByAdminSchema,
  getUsersSchema,
  inviteUserSchema,
  updateUserByAdminSchema,
  updateUserByCollaboratorSchema
} from './schemas';
import { UserDomain } from '@/core/domain/user-domain/user-domain';

const logInstance = ArchFramework.getLogInstance();
interface IUpdateUserByAdminRequest extends Request {
  body: {
    userId: string;
    userIdToBeUpdated: number;
    userIdpIdToBeUpdated: string;
    name: string;
    surname: string;
    email: string;
    userTypeId: number;
    phones: Array<{ phoneId: number; phone: string; type: string }>;
    admin: boolean;
    active: boolean;
  };
}

interface IUpdateUserByCollaboratorRequest extends Request {
  body: {
    userId: string;
    name: string;
    surname: string;
    phones: Array<{ phoneId: number; phone: string; type: string }>;
  };
}

export class UserController {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly userDomain: UserDomain) {}

  /**
   * Convida um usuário através do administrador.
   * @param req - Objeto de requisição HTTP.
   * @param res - Objeto de resposta HTTP.
   * @returns Retorna uma promessa que resolve para um objeto de resposta HTTP.
   */
  async inviteUser(req: Request, res: Response): Promise<Response> {
    try {
      //fazendo validação do payload
      const { error } = inviteUserSchema.validate(req.body);
      //retorna uma resposta com erro caso o payload esteja invalido
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }
      const { userEmail } = req.body;
      const adminIdpUserId = req.headers['x-idp-user-id'];

      //enviando convite para o usuario
      await this.userDomain.inviteUser(
        userEmail as string,
        adminIdpUserId as string
      );

      //retornando uma resposta informando que a solicitação de envio do convite foi efetuada com sucesso
      return res.status(200).json({
        success: true,
        message: 'Solicitação de usuário enviada com sucesso'
      });
    } catch (error) {
      logInstance.setError(
        error,
        'Erro no processo de convidar um novo usuário'
      );
      res.status(500).json({
        success: false,
        message: 'Erro no processo de convidar um novo usuário',
        error: error.message
      });
    }
  }

  /**
   * Atualiza os dados de um usuário pelo administrador.
   * @param req - Objeto de requisição HTTP.
   * @param res - Objeto de resposta HTTP.
   * @returns Retorna uma promessa que resolve para um objeto de resposta HTTP.
   */
  async updateUserByAdmin(
    req: IUpdateUserByAdminRequest,
    res: Response
  ): Promise<Response> {
    //fazendo validação do payload
    const { error } = updateUserByAdminSchema.validate(req.body);
    //retorna uma resposta com erro caso o payload esteja invalido
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
    try {
      //atualizando o usuario
      await this.userDomain.updateUserByAdmin({ ...req.body });

      //retornando uma resposta informando que os dados do usuario foram atualizados
      return res.status(200).json({
        success: true,
        message: 'Usuário editado com sucesso'
      });
    } catch (error) {
      logInstance.setError(
        error,
        'Erro no processo de alterar dados de um usuário pelo admin'
      );
      res.status(500).json({
        success: false,
        message: 'Erro no processo de alterar dados de um usuário pelo admin',
        error: error.message
      });
    }
  }

  /**
   * Atualiza os dados de um usuário pelo colaborador.
   * @param req - Objeto de requisição HTTP.
   * @param res - Objeto de resposta HTTP.
   * @returns Retorna uma promessa que resolve para um objeto de resposta HTTP.
   */
  async updateUserByCollaborator(
    req: IUpdateUserByCollaboratorRequest,
    res: Response
  ): Promise<Response> {
    try {
      //fazendo validação do payload
      const { error } = updateUserByCollaboratorSchema.validate(req.body);
      //retorna uma resposta com erro caso o payload esteja invalido
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      //atualizando os dados do usuario
      await this.userDomain.updateUserByCollaborator({
        ...req.body
      });

      //retornando uma resposta informando que os dados do usuario foram atualizados
      return res.status(200).json({
        success: true,
        message: 'Usuário editado com sucesso'
      });
    } catch (error) {
      logInstance.setError(
        error,
        'Erro no processo de alterar dados de um usuário pelo colaborador'
      );
      res.status(500).json({
        success: false,
        message:
          'Erro no processo de alterar dados de um usuário pelo colaborador',
        error: error.message
      });
    }
  }

  /**
   * Obtém os dados de um usuário pelo ID.
   * @param req - Objeto de requisição HTTP.
   * @param res - Objeto de resposta HTTP.
   * @returns Retorna uma promessa que resolve para um objeto de resposta HTTP.
   */
  async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      //fazendo a busca do usuario utilizando o userId recebido
      const response = await this.userDomain.getUser(userId);

      //retornando mensagem com o resultado da busca
      return res.status(200).json({
        success: true,
        data: response,
        message: 'Usuário encontrado com sucesso'
      });
    } catch (error) {
      logInstance.setError(error, 'Erro no processo de buscar um usuário');
      res.status(500).json({
        success: false,
        message: 'Erro no processo de buscar um usuário',
        error: error.message
      });
    }
  }

  /**
   * Obtém a lista de usuários de uma empresa associados a um administrador.
   * @param req - Objeto de requisição HTTP.
   * @param res - Objeto de resposta HTTP.
   * @returns Retorna uma promessa que resolve para um objeto de resposta HTTP.
   */
  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const idpUserId = req.params.idpUserId;

      const limit: string | undefined =
        typeof req.query.limit === 'string' ? req.query.limit : undefined;
      const offset: string | undefined =
        typeof req.query.offset === 'string' ? req.query.offset : undefined;
      //fazendo validação dos dados recebidos
      const { error } = getUsersSchema.validate({
        adminUserId: idpUserId,
        offset,
        limit
      });

      //retorna uma resposta com erro caso os dados recebidos estejam invalidos
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }
      //obtendo os dados dos usuarios
      const response = await this.userDomain.getUsers(idpUserId, limit, offset);
      return res.status(200).json({
        success: true,
        data: response,
        message: 'Usuários listados com sucesso'
      });
    } catch (error) {
      logInstance.setError(error, 'Erro no processo de listar usuários');
      res.status(500).json({
        success: false,
        message: 'Erro no processo de listar usuários',
        error: error.message
      });
    }
  }

  /**
   * Deleta um usuário pelo ID.
   * @param req - Objeto de requisição HTTP.
   * @param res - Objeto de resposta HTTP.
   * @returns Retorna uma promessa que resolve para um objeto de resposta HTTP.
   */
  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      //Deletando o usuario pelo userId
      await this.userDomain.deleteUser(userId);

      //retorna uma mensagem informando que o usuario foi excluido com sucesso
      return res.status(200).json({
        success: true,
        message: 'Usuário excluído com sucesso'
      });
    } catch (error) {
      logInstance.setError(error, 'Erro no processo de deletar um usuário');
      res.status(500).json({
        success: false,
        message: 'Erro no processo de deletar um usuário',
        error: error.message
      });
    }
  }

  /**
   * Deleta um usuário pelo ID do usuário.
   * @param req - Objeto de requisição HTTP.
   * @param res - Objeto de resposta HTTP.
   * @returns Retorna uma promessa que resolve para um objeto de resposta HTTP.
   */
  async deleteUserByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      //Deletando o usuario pelo userId
      await this.userDomain.deleteUserByUserId(userId);

      //retorna uma mensagem informando que o usuario foi excluido com sucesso
      return res.status(200).json({
        success: true,
        message: 'Usuário excluído com sucesso'
      });
    } catch (error) {
      logInstance.setError(error, 'Erro no processo de deletar um usuário');
      res.status(500).json({
        success: false,
        message: 'Erro no processo de deletar um usuário',
        error: error.message
      });
    }
  }

  /**
   * Ativa um usuário pelo IDP ID utilizando um token de acesso.
   * @param req - Objeto de requisição HTTP.
   * @param res - Objeto de resposta HTTP.
   * @returns Retorna uma promessa que resolve para um objeto de resposta HTTP.
   */
  async activateUserByAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const { userIdpIdToBeActivated } = req.params;

      //fazendo validação dos dados recebidos
      const { error } = activateUserByAdminSchema.validate({
        accessToken,
        userIdpIdToBeActivated
      });

      //retorna uma resposta com erro caso os dados recebidos estejam invalidos
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      //Ativa o usuario pelo admin
      await this.userDomain.activateUserByAdmin(
        accessToken,
        userIdpIdToBeActivated
      );

      //retorna uma mensagem informando que o usuario foi ativado com sucesso
      return res
        .status(200)
        .json({ success: true, message: 'Usuário ativado com sucesso' });
    } catch (error) {
      logInstance.setError(error, 'Erro no processo de ativar usuário');
      res.status(500).json({
        success: false,
        message: 'Erro no processo de ativar usuário',
        error: error.message
      });
    }
  }

  /**
   * Desativa um usuário pelo IDP ID utilizando um token de acesso.
   * @param req - Objeto de requisição HTTP.
   * @param res - Objeto de resposta HTTP.
   * @returns Retorna uma promessa que resolve para um objeto de resposta HTTP.
   */
  async deactivateUserByAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const { userIdpIdToBeDeactivated } = req.params;
      //fazendo validação os dados recebidos
      const { error } = deactivateUserByAdminSchema.validate({
        accessToken,
        userIdpIdToBeDeactivated
      });
      //retorna uma mensagem de erro caso os dados recebidos estejam invalidos
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      //desativando o usuario pelo admin
      await this.userDomain.deactivateUserByAdmin(
        accessToken,
        userIdpIdToBeDeactivated
      );

      //retorna uma mensagem informando que o usuario foi desativado com sucesso
      return res
        .status(200)
        .json({ success: true, message: 'Usuário desativado com sucesso' });
    } catch (error) {
      logInstance.setError(error, 'Erro no processo de desativar usuário');
      res.status(500).json({
        success: false,
        message: 'Erro no processo de desativar usuário',
        error: error.message
      });
    }
  }
}
