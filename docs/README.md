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

- [] Tela de login e criação de conta
- [] Login com e-mail e senha
- [] Login com o Google
- [] Fundamentos do Next.js (Rotas, Páginas, Layouts)
- [] Criação de clínica

