export interface GetUser {
  userId: string;
}

export interface GetUserDTOResponse {
  data: {
    userId: number;
    userIdpId: string;
    name: string;
    surname: string;
    userType: {
      userTypeId: number;
      userType: string;
    };
    admin: boolean;
    company: {
      companyId: number;
      companyName: string;
    };
    active: boolean;
    email: {
      emailId: number;
      userId: number;
      email: string;
      type: string;
    };
    phones: Array<{
      phoneId: number;
      userId: number;
      phone: string;
      whatsapp: boolean;
      telegram: boolean;
      type: string;
    }>;
    cpf: string;
    lastLoginAt: Date;
    createdAt: Date;
  };
}

export interface GetUsers {
  userId: string;
  limit?: number;
  offset?: number;
}

export interface GetUsersDTOResponse {
  users: GetUserDTOResponse[];
  total: number;
}

export interface UpdateUserByAdminDto {
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
}

export interface UpdateUserByCollaboratorDto {
  userId: string;
  name: string;
  surname: string;
  phones: Array<{ phoneId: number; phone: string; type: string }>;
}

export interface SendEmailEventMessageDto {
  templateName: string;
  to: string[];
  attributes?: object;
}
