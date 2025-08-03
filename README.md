## Sobre o projeto

Bff de admin do projeto da Versatus

### Tecnologias utilizadas

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

## Começando

Esse documento explica como importar, instalar e executar esse projeto

### Prerequisitos

Antes de executar esse projeto, verifique se as dependências abaixo foram instaladas

- NodeJS versão 18 ou superior [NodeJS](https://nodejs.org/en)
- Docker [Docker Desktop](https://docs.docker.com/desktop/)

### Variáveis de ambiente

Essas variáveis de ambiente devem ser configuradas antes de executar a aplicação

```ts
  QUEUE_NAME= #Nome da fila para recebimento dos emails a serem enviados

  INVITE_NEW_USER_TEMPLATE_ID = #Nome do template de convidar novo usuário

  MS_UPDATE_REGISTRATION_DATA_URL= #Endereço do micro serviço de update registration data

  BFF_ADMIN_PORT= #Porta de conexão do bff-admin

  FRONTEND_URL= #Endereço do frontend que ira chamar a aplicação

  VAULT_URL= #URL do servidor Vault utilizado para armazenar e acessar segredos de forma segura
  VAULT_ROLE_NAME= #Nome utilizado para acessar o Vault
  VAULT_TOKEN= #Token de autenticação utilizado para acessar o Vault
  VAULT_ENV= #Nome do ambiente do Vault, utilizado para diferenciar configurações entre diferentes ambientes (como staging,  produção, etc)
```

### Instalação

_Siga os passos abaixo para configurar a aplicação_

1. Clone oe repositório

```sh
git clone git@bitbucket.org:versatushpc/bff-admin.git
```

2. Instale as dependências do projeto

```sh
npm i
```

3. Build o projeto

```sh
npm run build
```

4. Inicie a aplicação

```sh
npm run start
```

5. Verifique no console a mensagem que informa que a aplicação iniciou

```sh
Servidor está executando na porta: XXXX
```
