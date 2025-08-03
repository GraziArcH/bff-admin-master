import axios from 'axios';

import { config } from '../infrastructure/config';
import {
  GetUserDTOResponse,
  GetUsersDTOResponse,
  UpdateUserByAdminDto,
  UpdateUserByCollaboratorDto
} from '../domain/user-domain/dtos';
import GlobalError from '../errors';

export class UpdateRegistrationDataGateway {
  private readonly MS_UPDATE_REGISTRATION_DATA_URL =
    config.MS_UPDATE_REGISTRATION_DATA_URL;

  /**
   * Atualiza os dados de um usuário pelo administrador.
   * @param updateUserByAdmin - Objeto contendo os dados a serem atualizados pelo administrador.
   * @returns Retorna uma promessa que resolve para um valor booleano indicando se a atualização foi bem-sucedida.
   */
  async updateUserByAdmin(
    updateUserByAdmin: UpdateUserByAdminDto
  ): Promise<boolean> {
    try {
      // Envia uma requisição PUT para o microserviço de atualização de dados de registro
      const response = await axios.put(
        `${this.MS_UPDATE_REGISTRATION_DATA_URL}/users/admin`,
        updateUserByAdmin
      );

      // Retorna se a atualização foi bem-sucedida com base na resposta do servidor
      return response.data.success;
    } catch (error) {
      throw new GlobalError(
        'Erro ao acessar o serviço ms-update-registration-data',
        500,
        error
      );
    }
  }

  /**
   * Atualiza os dados de um usuário por um colaborador.
   * @param updateUserByCollaborator - Objeto contendo os dados a serem atualizados pelo colaborador.
   * @returns Retorna uma promessa que resolve para um valor booleano indicando se a atualização foi bem-sucedida.
   */
  async updateUserByCollaborator(
    updateUserByCollaborator: UpdateUserByCollaboratorDto
  ): Promise<boolean> {
    try {
      // Desestrutura os campos do objeto de atualização do colaborador
      const { userId, name, surname, phones } = updateUserByCollaborator;

      // Envia uma requisição PUT para o microserviço de atualização de dados de registro
      const response = await axios.put(
        `${this.MS_UPDATE_REGISTRATION_DATA_URL}/users/collaborator`,
        {
          userId,
          name,
          surname,
          phones
        }
      );

      // Retorna se a atualização foi bem-sucedida com base na resposta do servidor
      return response.data.success;
    } catch (error) {
      throw new GlobalError(
        'Erro ao acessar o serviço ms-update-registration-data',
        500,
        error
      );
    }
  }

  /**
   * Obtém os dados de um usuário pelo ID.
   * @param userId - ID do usuário a ser obtido.
   * @returns Retorna uma promessa que resolve para um objeto do tipo GetUserDTOResponse contendo os dados do usuário.
   */
  async getUser(userId: string): Promise<GetUserDTOResponse> {
    try {
      // Envia uma requisição GET para o microserviço de atualização de dados de registro
      const response = await axios.get(
        `${this.MS_UPDATE_REGISTRATION_DATA_URL}/users/${userId}`
      );

      // Retorna os dados do usuário obtidos na resposta do servidor
      return response.data.data.data;
    } catch (error) {
      throw new GlobalError(
        'Erro ao acessar o serviço ms-update-registration-data',
        500,
        error
      );
    }
  }

  /**
   * Obtém a lista de usuários de uma empresa associados a um administrador.
   * @param adminUserId - ID do usuário administrador.
   * @param limit - (Opcional) Limite de usuários a serem retornados.
   * @param offset - (Opcional) Deslocamento para paginação dos resultados.
   * @returns Retorna uma promessa que resolve para um objeto contendo a lista de usuários.
   */
  async getUsers(
    adminUserId: string,
    limit?: string,
    offset?: string
  ): Promise<GetUsersDTOResponse> {
    try {
      // Constrói a query string com os parâmetros opcionais de limite e deslocamento
      const isLimit = limit ? `limit=${limit}&` : '';
      const isOffset = offset ? `offset=${offset}` : '';

      // Envia uma requisição GET para o microserviço de atualização de dados de registro
      const response = await axios.get(
        `${this.MS_UPDATE_REGISTRATION_DATA_URL}/users/${adminUserId}/company-users?${isLimit}${isOffset}`
      );

      // Retorna os dados dos usuários com base na resposta do servidor
      return response.data.data;
    } catch (error) {
      throw new GlobalError(
        'Erro ao acessar o serviço ms-update-registration-data',
        500,
        error
      );
    }
  }

  /**
   * Deleta um usuário pelo ID.
   * @param deleteUser - ID do usuário a ser deletado.
   * @returns Retorna uma promessa que resolve para um valor booleano indicando se a exclusão foi bem-sucedida.
   */
  async deleteUser(deleteUser: string): Promise<boolean> {
    try {
      // Envia uma requisição DELETE para o microserviço de atualização de dados de registro
      const response = await axios.delete(
        `${this.MS_UPDATE_REGISTRATION_DATA_URL}/users/idp/${deleteUser}`
      );

      // Retorna se a exclusão foi bem-sucedida com base na resposta do servidor
      return response.data.success;
    } catch (error) {
      throw new GlobalError(
        'Erro ao acessar o serviço ms-update-registration-data',
        500,
        error
      );
    }
  }

  /**
   * Deleta um usuário pelo ID.
   * @param deleteUser - ID do usuário a ser deletado.
   * @returns Retorna uma promessa que resolve para um valor booleano indicando se a exclusão foi bem-sucedida.
   */
  async deleteUserByUserId(deleteUser: string): Promise<boolean> {
    try {
      // Envia uma requisição DELETE para o microserviço de atualização de dados de registro
      const response = await axios.delete(
        `${this.MS_UPDATE_REGISTRATION_DATA_URL}/users/${deleteUser}`
      );

      // Retorna se a exclusão foi bem-sucedida com base na resposta do servidor
      return response.data.success;
    } catch (error) {
      throw new GlobalError(
        'Erro ao acessar o serviço ms-update-registration-data',
        500,
        error
      );
    }
  }

  /**
   * Ativa um usuário pelo IDP ID utilizando um token de acesso.
   * @param accessToken - Token de acesso para autenticação.
   * @param userIdpIdToBeActivated - IDP ID do usuário a ser ativado.
   * @returns Retorna uma promessa que resolve para um valor booleano indicando se a ativação foi bem-sucedida.
   */
  async activateUserByAdmin(
    accessToken: string,
    userIdpIdToBeActivated: string
  ): Promise<boolean> {
    try {
      // Envia uma requisição POST para ativar o usuário com o IDP ID fornecido
      const response = await axios.post(
        `${this.MS_UPDATE_REGISTRATION_DATA_URL}/users/activate/${userIdpIdToBeActivated}`,
        accessToken
      );

      // Retorna se a ativação foi bem-sucedida com base na resposta do servidor
      return response.data.success;
    } catch (error) {
      throw new GlobalError(
        'Erro ao acessar o serviço ms-update-registration-data',
        500,
        error
      );
    }
  }

  /**
   * Desativa um usuário pelo IDP ID utilizando um token de acesso.
   * @param accessToken - Token de acesso para autenticação.
   * @param userIdpIdToBeDeactivated - IDP ID do usuário a ser desativado.
   * @returns Retorna uma promessa que resolve para um valor booleano indicando se a desativação foi bem-sucedida.
   */
  async deactivateUserByAdmin(
    accessToken: string,
    userIdpIdToBeDeactivated: string
  ): Promise<boolean> {
    try {
      // Envia uma requisição POST para desativar o usuário com o IDP ID fornecido
      const response = await axios.post(
        `${this.MS_UPDATE_REGISTRATION_DATA_URL}/users/deactivate/${userIdpIdToBeDeactivated}`,
        { accessToken: accessToken }
      );

      // Retorna se a desativação foi bem-sucedida com base na resposta do servidor
      return response.data.success;
    } catch (error) {
      throw new GlobalError(
        'Erro ao acessar o serviço ms-update-registration-data',
        500,
        error
      );
    }
  }
}
