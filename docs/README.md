## Setup do projeto

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
```