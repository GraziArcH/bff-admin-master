/* eslint-disable no-unused-vars */
import {
  type UpdateUserByAdminDto,
  type UpdateUserByCollaboratorDto,
  type GetUserDTOResponse,
  type GetUsersDTOResponse
} from './dtos';

export interface IUserDomain {
  /**
   * Atualiza os detalhes do usuário por um administrador.
   * @param dto - Objeto de transferência de dados contendo os detalhes do usuário a serem atualizados.
   * @returns Uma promessa que resolve para um valor desconhecido.
   */
  updateUserByAdmin: (dto: UpdateUserByAdminDto) => Promise<unknown>;

  /**
   * Atualiza os detalhes do usuário por um colaborador.
   * @param dto - Objeto de transferência de dados contendo os detalhes do usuário a serem atualizados.
   * @returns Uma promessa que resolve para um valor desconhecido.
   */
  updateUserByCollaborator: (
    dto: UpdateUserByCollaboratorDto
  ) => Promise<unknown>;

  /**
   * Recupera uma lista de usuários.
   * @param userId - O ID do usuário que está fazendo a solicitação.
   * @param limit - O número máximo de usuários a serem recuperados.
   * @param offset - O número de usuários a serem ignorados antes de começar a coletar o conjunto de resultados.
   * @returns Uma promessa que resolve para uma resposta contendo a lista de usuários.
   */
  getUsers: (
    userId: string,
    limit?: string,
    offset?: string
  ) => Promise<GetUsersDTOResponse>;

  /**
   * Recupera os detalhes de um único usuário.
   * @param userId - O ID do usuário a ser recuperado.
   * @returns Uma promessa que resolve para uma resposta contendo os detalhes do usuário.
   */
  getUser: (userId: string) => Promise<GetUserDTOResponse>;

  /**
   * Exclui um usuário.
   * @param userId - O ID do usuário a ser excluído.
   * @returns Uma promessa que resolve para um valor desconhecido.
   */
  deleteUser: (userId: string) => Promise<unknown>;

  /**
   * Exclui um usuário pelo ID do usuário.
   * @param userId - O ID do usuário a ser excluído.
   * @returns Uma promessa que resolve para um valor desconhecido.
   */
  deleteUserByUserId: (userId: string) => Promise<unknown>;

  /**
   * Convida um novo usuário.
   * @param userEmail - O email do usuário a ser convidado.
   * @param adminIDPUserId - O IDP do usuário administrador que está enviando o convite.
   * @returns Uma promessa que resolve para void.
   */
  inviteUser: (userEmail: string, adminIDPUserId: string) => Promise<void>;

  /**
   * Ativa um usuário por um administrador.
   * @param accessToken - O token de acesso do administrador.
   * @param userIdpIdToBeActivated - O IDP do usuário a ser ativado.
   * @returns Uma promessa que resolve para um booleano indicando o sucesso da operação.
   */
  activateUserByAdmin: (
    accessToken: string,
    userIdpIdToBeActivated: string
  ) => Promise<boolean>;

  /**
   * Desativa um usuário por um administrador.
   * @param accessToken - O token de acesso do administrador.
   * @param userIdpIdToBeDeactivated - O IDP do usuário a ser desativado.
   * @returns Uma promessa que resolve para um booleano indicando o sucesso da operação.
   */
  deactivateUserByAdmin: (
    accessToken: string,
    userIdpIdToBeDeactivated: string
  ) => Promise<boolean>;
}
