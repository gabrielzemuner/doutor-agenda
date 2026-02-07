## Aula 1. Setup do projeto

- [x] Inicialização do projeto Next.js
- [x] Configuração de ferramentas (ESlint, Prettier, Tailwind)
- [x] Configuração do Drizzle e banco de dados
- [x] Configuração de shadcn/ui

### Plugin prettier para ordenar classes tailwind (melhorar padrão)

- https://tailwindcss.com/blog/automatic-class-sorting-with-prettier

```bash
npm install -D prettier@3.5.3 prettier-plugin-tailwindcss@0.6.11
```

- criar arquivo `.prettierrc.json` e colar código abaixo:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Plugin prettier import sort

```bash
npm install --save-dev prettier-plugin-organize-imports
```

- colar código abaixo no arquivo `.prettierrc.json`:

```json
{
  "plugins": ["prettier-plugin-organize-imports"]
}
```
### Config git + dica commits

- padrão conventional commits

```bash
git status
git add .
git commit -m "chore: add prettier setup"
```
### Requisitos funcionais da nossa aplicação

- o que nossa aplicação vai ter de funcionalidades

    0. Autenticação (1 usuário pode ter mais de 1 clínica)
    1. Clínica deve conseguir gerenciar médicas (CRUD)
        - Disponibilidade; Preço da consulta
    2. Clínica deve conseguir gerenciar pacientes dos médicos (CRUD)
    3. Clínica deve conseguir realizar agendamentos de tal médico para tal paciente
    4. Teremos planos de assinatura

### Config banco de dados

- neon

- configuração do arquivo .env variável `DATABASE_URL`

- instalar drizzle orm

```bash
npm i drizzle-orm@0.43.1 pg@8.15.6
npm i -D drizzle-kit@0.31.1
```

- criar arquivo `src/db/index.ts`

- criar arquivo `drizzle.config.ts` na raiz do projeto

- criar arquivo `src/db/schema.ts` e configurar as tabelas e relacionamentos

- vantagem do drizzle -> criar tabelas totalmente com typescript

- dica pra salvar imagens, nunca o binário, sempre a url da imagem. E colocar a imagem no s3 da aws

- salvar valores monetários, nunca usar tipo float (não lida bem com pontos flutuantes, pois tem como objetivo economizar memória... com isso, as vezes arredonda/corta certos números/casas decimais => ex: 0.7 + 0.1 = 0.799999999999)

- pra salvar valores monetários, usar tipo numeric do postgres

- após configuras as tabelas e relacionamentos, criar as tabelas no banco

```
npx drizzle-kit push
```

- comando abaixo pra visualizar as tabelas

```
npx drizzle-kit studio
```

### Shadcn - biblioteca de components

```
npx shadcn@2.5.0 init
```

## Aula 2. Autenticação e configurações do estabelecimento

- [x] Tela de login e criação de conta
- [] Login com e-mail e senha
- [] Login com o Google
- [] Fundamentos do Next.js (Rotas, Páginas, Layouts)
- [] Criação de clínica

### Configuração de tela de login/criação de conta com shadcn

### Login com e-mail e senha -> biblioteca betterauth

```bash
npm install better-auth@1.2.7
```

- definir variável de ambiente BETTER_AUTH_SECRET no arquivo `.env`

- definir variável de ambiente BETTER_AUTH_URL no arquivo `.env`

- criar arquivo `auth.ts` na pasta lib

- conectar o betterauth com o drizzle

- rodar o comando abaixo (antes instalar o dotenv pois o arquivo db/index.ts utiliza o dotenv)

```bash
npm install dotenv@16.5.0
```

```bash
npx @better-auth/cli@1.2.7 generate
```

- clicar em yes pra gerar schema => `./auth-schema.ts`

- o arquivo `auth-schema.ts` possui as tabelas que o betterauth precisa para funcionar. O betterauth cria a sessão atual do usuário e armazena no banco de dados

- copiar e colar as tabelas do arquivo `auth-schema.ts` e colar no arquivo `src/db/schema.ts`

- o betterauth (através do arquivo `auth-schema.ts`) cria uma tabela chamada user, mas nossa tabela no `schema.ts` é users. Necessário "fundir" as duas

- precisamos aplicar as mudanças no banco de dados (antes, executar o comando sql `DROP table users CASCADE`)

```bash
npx drizzle-kit push
```

- pra manter o padrão do arquivo `schema.ts`, renomeado as consts e as tabelas:
  - sessionsTable => tabela session => sessions
  - accountsTable => tabela account => accounts
  - verificationTable => tabela verification => verifications

- no arquivo `auth.ts`, utilizar depois do provider o comando `usePlural: true`

![alt text](image.png)

- também precisamos que o betterauth utilize as tabelas que criamos no `schema.ts` pois estamos usando nomes diferentes do padrão

![alt text](image-1.png)

- rodar novamente o comando abaixo

```bash
npx drizzle-kit push
```

![alt text](image-2.png)

- podemos deletar o arquivo `auth-schema.ts` que havia sido gerado, pois utilizamos apenas pra adaptar o schema do betterauth ao nosso schema do drizzle no arquivo `schema.ts`