# 📝 API de Rede Social - Tarefa 2

API RESTful desenvolvida em **Node.js** e **TypeScript** para uma plataforma social simples, permitindo gerenciar usuários, posts, comentários e likes.  
O projeto segue os princípios de **Arquitetura Limpa (Clean Architecture)** para garantir separação de responsabilidades, fácil manutenção e testabilidade.

---

## ⚙️ Funcionalidades

### 👤 Usuários
- Criar novos usuários (registro) com e-mail único.
- Autenticar usuários (login) e obter um token de acesso.
- Listar todos os usuários do sistema.
- Buscar um usuário específico por **ID**.
- Atualizar informações de um usuário (apenas pelo próprio usuário).
- Excluir um usuário (apenas pelo próprio usuário), com **deleção em cascata** de todos os seus posts, comentários e likes.

### ✍️ Posts
- Criar novos posts (requer autenticação).
- Listar todos os posts, com informações do autor.
- Buscar um post específico por **ID**.
- Listar todos os posts de um usuário específico.
- Atualizar um post (apenas pelo autor).
- Excluir um post (apenas pelo autor), com deleção em cascata de seus comentários e likes.

### 💬 Comentários
- Criar comentários em um post (requer autenticação).
- Listar todos os comentários do sistema.
- Listar todos os comentários de um post específico.
- Listar todos os comentários de um usuário específico.
- Excluir um comentário (apenas pelo autor).

### ❤️ Likes
- Criar um like em um post **ou** em um comentário (requer autenticação).
- Excluir um like (apenas pelo autor).
- Listar todos os likes de um post específico.
- Listar todos os likes de um comentário específico.
- Listar todos os likes de um usuário específico.

---

## 🛡️ Regras de Negócio e Segurança
- **Validação** de dados de entrada com Zod.
- **Armazenamento seguro** de senhas com bcryptjs.
- **Autenticação** via JWT para proteger rotas.
- **Autorização** para garantir que um usuário só possa modificar seus próprios recursos.
- **Deleção em cascata** (`onDelete: Cascade`) para manter a integridade do banco.
- **Tratamento de erros customizados** para respostas consistentes e claras.

---

## 🏛️ Arquitetura
O projeto segue **SOLID** e **Repository Pattern**, organizado em:
- **Controllers** → Recebem requisições HTTP, validam dados e chamam o caso de uso apropriado.
- **Use Cases** → Contêm a lógica de negócio pura, orquestrando regras e acessos.
- **Repositories** → Definem contratos de acesso a dados, implementados com **Prisma ORM**.

---

## 💻 Tecnologias Utilizadas
- **Core:** Node.js + TypeScript  
- **Framework:** Fastify  
- **ORM:** Prisma  
- **Banco de Dados:** SQLite  
- **Validação:** Zod  
- **Build Tool:** tsup  
- **Execução em Dev:** tsx  
- **Segurança:** bcryptjs, @fastify/jwt

---

## 📌 Endpoints da API

| Método        | Endpoint                      | Descrição                               | Autenticação |
|---------------|-------------------------------|-----------------------------------------|--------------|
| **POST**      | `/users`                      | Criar um novo usuário                   | ❌           |
| **POST**      | `/sessions`                   | Autenticar usuário (login)              | ❌           |
| **GET**       | `/users`                      | Listar todos os usuários                | ❌           |
| **GET**       | `/users/:id`                  | Buscar usuário por ID                   | ❌           |
| **PUT/PATCH** | `/users/:id`                  | Atualizar usuário                       | ✅           |
| **DELETE**    | `/users/:id`                  | Deletar usuário                         | ✅           |
| **POST**      | `/posts`                      | Criar um novo post                      | ✅           |
| **GET**       | `/posts`                      | Listar todos os posts                   | ❌           |
| **GET**       | `/posts/:id`                  | Buscar post por ID                      | ❌           |
| **GET**       | `/users/:userId/posts`        | Listar posts de um usuário              | ❌           |
| **PUT/PATCH** | `/posts/:id`                  | Atualizar post                          | ✅           |
| **DELETE**    | `/posts/:id`                  | Deletar post                            | ✅           |
| **POST**      | `/posts/:postId/comments`     | Criar comentário em um post             | ✅           |
| **GET**       | `/comments`                   | Listar todos os comentários             | ❌           |
| **GET**       | `/comments/:commentId`        | Buscar comentário por ID                | ❌           |
| **GET**       | `/users/:userId/comments`     | Listar comentários de um usuário        | ❌           |
| **GET**       | `/posts/:postId/comments`     | Listar comentários de um post           | ❌           |
| **DELETE**    | `/comments/:commentId`        | Deletar comentário                      | ✅           |
| **POST**      | `/likes`                      | Criar like em post/comentário           | ✅           |
| **DELETE**    | `/likes/:likeId`              | Deletar like                            | ✅           |
| **GET**       | `/likes/:likeId`              | Buscar like por ID                      | ❌           |
| **GET**       | `/users/:userId/likes`        | Listar likes de um usuário              | ❌           |
| **GET**       | `/posts/:postId/likes`        | Listar likes de um post                 | ❌           |
| **GET**       | `/comments/:commentId/likes`  | Listar likes de um comentário           | ❌           |

---

## 📝 Observações Importantes
Para este projeto, o campo **`createdAt`** nos modelos **Post**, **Comentario** e **Like** foi modificado no `schema.prisma` para incluir a diretiva `@default(now())`.

Essa mudança, em relação à primeira tarefa onde a data era definida manualmente na aplicação, foi feita para alinhar o projeto a uma prática de mercado mais robusta. Delegar a criação do timestamp ao banco de dados garante maior consistência dos dados, simplifica a lógica nos Casos de Uso e torna o sistema mais próximo de uma aplicação real.
