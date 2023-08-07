# Soft Design API

## Configuração e Execução do Projeto

1. Para este projeto foi utilizado o Node v18.17.0
2. Clone este repositório.
3. Instale as dependências com `npm install`.
4. Inicie o servidor com:
    ```bash
    npm run dev
    ```
5. Nome do Database: `soft_design_api_db`.

## Endpoints

### Autenticação

- **Login** (Retorna token necessário para acessar outros endpoints)
  - POST: http://localhost:4000/login

### Usuários

- **Listar todos os usuários**:
  - GET: http://localhost:4000/users

- **Criar um usuário**:
  - POST: http://localhost:4000/users
  
  **Corpo da requisição(Exemplo)**:
  ```json
  {
      "name": "root",
      "email": "root@root",
      "password": "12345"
  }

### Livros

- **Retornar todos os livros**:
  - GET: `http://localhost:4000/books`

- **Retornar detalhes do livro pelo título**:
  - GET: `http://localhost:4000/books?title="Duna"`

- **Retornar detalhes de um livro pelo ID**:
  - GET: `http://localhost:4000/books/:id`

- **Criar um livro**:
  - POST: `http://localhost:4000/books`

  **Corpo da requisição(Exemplo)**:
  ```json
  {
      "title": "Duna",
      "author": "Frank Herbert",
      "isbn": "123-456",
      "publishedDate": "2022-01-01T00:00:00.000Z",
      "pages": 300,
      "genre": "Fiction",
      "rentedBy": null
  }

- **Atualizar detalhes de um livro**: (O campo `rentedBy` recebe o id de quem alugou o livro. Só pode receber outro id se antes for atualizado para null, sinalizando que o livro esta disponível.)
  - PUT: `http://localhost:4000/books/:id`

- **Excluir um livro**:
  - DELETE: `http://localhost:4000/books/:id`
