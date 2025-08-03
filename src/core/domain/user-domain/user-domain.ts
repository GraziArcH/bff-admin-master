import { EmailMessageProducer } from '@/core/infrastructure/email-message.producer';
import {
  type UpdateUserByAdminDto,
  type UpdateUserByCollaboratorDto,
  type GetUsersDTOResponse,
  type GetUserDTOResponse
} from './dtos';
import { type IUserDomain } from './interface';
import { UpdateRegistrationDataGateway } from '@/core/gateway/update-registration-data.gateway';
import { userFacade } from '@archoffice/domain-infraestructure';
import { config } from '../../infrastructure/config';
import GlobalError from '@/core/errors';

// Constante que armazena o ID do template de convite de novo usuário a partir da configuração
const INVITE_NEW_USER_TEMPLATE_ID = config.INVITE_NEW_USER_TEMPLATE_ID;

// Definição da classe UserDomain que implementa a interface IUserDomain
export class UserDomain implements IUserDomain {
  // Propriedades privadas para os produtores de mensagens e gateways de atualização
  private readonly emailMessageProducer: EmailMessageProducer;
  private readonly updateRegistrationDataGateway: UpdateRegistrationDataGateway;

  // Construtor da classe UserDomain
  constructor() {
    // Instancia o produtor de mensagens de email
    this.emailMessageProducer = new EmailMessageProducer();
    // Instancia o gateway de atualização de dados de registro
    this.updateRegistrationDataGateway = new UpdateRegistrationDataGateway();
  }

  // Método para convidar um novo usuário via email
  async inviteUser(userEmail: string, adminIDPUserId: string): Promise<void> {
    try {
      // Cria um convite usando a facade do usuário
      const invite = await userFacade.createInvite(adminIDPUserId, userEmail);

      // Envia o convite por email utilizando o produtor de mensagens
      await this.emailMessageProducer.send({
        templateName: INVITE_NEW_USER_TEMPLATE_ID,
        to: [userEmail],
        attributes: {
          hash: invite.hash.value
        }
      });
    } catch (error) {
      // Lança um erro global em caso de falha no processo de convite
      throw new GlobalError(
        'Erro no processo de convidar um novo usuário',
        500,
        error
      );
    }
  }

  // Método para atualizar um usuário por um administrador
  async updateUserByAdmin(
    updateUserByAdmin: UpdateUserByAdminDto
  ): Promise<boolean> {
    try {
      // Atualiza os dados do usuário através do gateway de atualização
      return await this.updateRegistrationDataGateway.updateUserByAdmin(
        updateUserByAdmin
      );
    } catch (error) {
      // Lança um erro global em caso de falha na atualização pelo administrador
      throw new GlobalError(
        'Não foi possível editar o usuário pelo administrador',
        500,
        error
      );
    }
  }

  // Método para atualizar um usuário por um colaborador
  async updateUserByCollaborator(
    updateUserByCollaborator: UpdateUserByCollaboratorDto
  ): Promise<boolean> {
    try {
      // Atualiza os dados do usuário através do gateway de atualização
      return await this.updateRegistrationDataGateway.updateUserByCollaborator(
        updateUserByCollaborator
      );
    } catch (error) {
      // Lança um erro global em caso de falha na atualização pelo colaborador
      throw new GlobalError(
        'Não foi possível editar o usuário pelo colaborador',
        500,
        error
      );
    }
  }

  // Método para obter a lista de usuários
  async getUsers(
    adminUserId: string,
    limit?: string,
    offset?: string
  ): Promise<GetUsersDTOResponse> {
    try {
      // Obtém a lista de usuários através do gateway de atualização de registro
      return await this.updateRegistrationDataGateway.getUsers(
        adminUserId,
        limit,
        offset
      );
    } catch (error) {
      // Lança um erro global em caso de falha na obtenção da lista de usuários
      throw new GlobalError('Não foi possível listar os usuários', 500, error);
    }
  }

  // Método para obter um usuário específico pelo ID
  async getUser(userId: string): Promise<GetUserDTOResponse> {
    try {
      // Obtém os dados do usuário através do gateway de atualização de registro
      return await this.updateRegistrationDataGateway.getUser(userId);
    } catch (error) {
      // Lança um erro global em caso de falha na obtenção dos dados do usuário
      throw new GlobalError('Não foi possível buscar o usuário', 500, error);
    }
  }

  // Método para deletar um usuário pelo ID
  async deleteUser(userId: string): Promise<boolean | Error> {
    try {
      // Deleta o usuário através do gateway de atualização de registro
      return await this.updateRegistrationDataGateway.deleteUser(userId);
    } catch (error) {
      // Lança um erro global em caso de falha na exclusão do usuário
      throw new GlobalError('Não foi possível deletar o usuário', 500, error);
    }
  }

  // Método para deletar um usuário pelo ID
  async deleteUserByUserId(userId: string): Promise<boolean | Error> {
    try {
      // Deleta o usuário através do gateway de atualização de registro
      return await this.updateRegistrationDataGateway.deleteUserByUserId(
        userId
      );
    } catch (error) {
      // Lança um erro global em caso de falha na exclusão do usuário
      throw new GlobalError('Não foi possível deletar o usuário', 500, error);
    }
  }

  // Método para ativar um usuário pelo administrador
  async activateUserByAdmin(
    accessToken: string,
    userIdpIdToBeActivated: string
  ): Promise<boolean> {
    try {
      // Ativa o usuário através do gateway de atualização de registro
      return await this.updateRegistrationDataGateway.activateUserByAdmin(
        accessToken,
        userIdpIdToBeActivated
      );
    } catch (error) {
      // Lança um erro global em caso de falha na ativação do usuário
      throw new GlobalError('Não foi possível ativar o usuário', 500, error);
    }
  }

  // Método para desativar um usuário pelo administrador
  async deactivateUserByAdmin(
    accessToken: string,
    userIdpIdToBeDeactivated: string
  ): Promise<boolean> {
    try {
      // Desativa o usuário através do gateway de atualização de registro
      return await this.updateRegistrationDataGateway.deactivateUserByAdmin(
        accessToken,
        userIdpIdToBeDeactivated
      );
    } catch (error) {
      // Lança um erro global em caso de falha na desativação do usuário
      throw new GlobalError('Não foi possível desativar o usuário', 500, error);
    }
  }
}
