import * as dotenv from 'dotenv';

dotenv.config();
export interface ConfigType {
  QUEUE_NAME: string;
  MS_UPDATE_REGISTRATION_DATA_URL: string;
  INVITE_NEW_USER_TEMPLATE_ID: string;
  BFF_ADMIN_PORT: string;
  FRONTEND_URL: string;
  VAULT_URL: string;
  VAULT_ROLE_NAME: string;
  VAULT_TOKEN: string;
  VAULT_ENV: string;
  LIB_INFRASTRUCTURE_POSTGRES_USER: string;
  LIB_INFRASTRUCTURE_POSTGRES_PASSWORD: string;
  LIB_INFRASTRUCTURE_POSTGRES_PORT: string;
  LIB_INFRASTRUCTURE_POSTGRES_HOST: string;
  LIB_INFRASTRUCTURE_POSTGRES_SSL: string;
  LIB_SALES_POSTGRES_USER: string;
  LIB_SALES_POSTGRES_PASSWORD: string;
  LIB_SALES_POSTGRES_PORT: string;
  LIB_SALES_POSTGRES_HOST: string;
  LIB_SALES_POSTGRES_SSL: string;
}

export const config: ConfigType = {
  QUEUE_NAME: process.env.QUEUE_NAME,
  MS_UPDATE_REGISTRATION_DATA_URL: process.env.MS_UPDATE_REGISTRATION_DATA_URL,
  INVITE_NEW_USER_TEMPLATE_ID: process.env.INVITE_NEW_USER_TEMPLATE_ID,
  BFF_ADMIN_PORT: process.env.BFF_ADMIN_PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  VAULT_URL: process.env.VAULT_URL,
  VAULT_ROLE_NAME: process.env.VAULT_ROLE_NAME,
  VAULT_TOKEN: process.env.VAULT_TOKEN,
  VAULT_ENV: process.env.VAULT_ENV,
  LIB_INFRASTRUCTURE_POSTGRES_USER:
    process.env.LIB_INFRASTRUCTURE_POSTGRES_USER,
  LIB_INFRASTRUCTURE_POSTGRES_PASSWORD:
    process.env.LIB_INFRASTRUCTURE_POSTGRES_PASSWORD,
  LIB_INFRASTRUCTURE_POSTGRES_PORT:
    process.env.LIB_INFRASTRUCTURE_POSTGRES_PORT,
  LIB_INFRASTRUCTURE_POSTGRES_HOST:
    process.env.LIB_INFRASTRUCTURE_POSTGRES_HOST,
  LIB_INFRASTRUCTURE_POSTGRES_SSL: process.env.LIB_INFRASTRUCTURE_POSTGRES_SSL,
  LIB_SALES_POSTGRES_USER: process.env.LIB_SALES_POSTGRES_USER,
  LIB_SALES_POSTGRES_PASSWORD: process.env.LIB_SALES_POSTGRES_PASSWORD,
  LIB_SALES_POSTGRES_PORT: process.env.LIB_SALES_POSTGRES_PORT,
  LIB_SALES_POSTGRES_HOST: process.env.LIB_SALES_POSTGRES_HOST,
  LIB_SALES_POSTGRES_SSL: process.env.LIB_SALES_POSTGRES_SSL
};

//função que faz a validação das variaveis de ambiente
export const validateEnvVars = (): void => {
  const nullVariablesList = [];

  //verificando se todas as variaveis de ambiente estão configuradas
  for (const variable in config) {
    const value = config[variable];

    if (!value) {
      nullVariablesList.push(variable);
    }
  }

  //caso falte alguma variavel de ambiente, ira lançar um erro
  if (nullVariablesList.length > 0) {
    const messageError = `As variáveis ${nullVariablesList.join(', ')} estão nulas`;
    console.error(messageError);
    throw new Error(messageError);
  }
};
