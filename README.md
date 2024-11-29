# FinTrack

[PLANEJAMENTO DE BRANCHES E ENTREGAS](https://www.notion.so/PLANEJAMENTO-DE-BRANCHES-E-ENTREGAS-14d99493f78080aab5fbf3890e321c28?pvs=21)

# 1. Introdução

O Fintrack é uma plataforma web para gerenciamento de finanças pessoais, permitindo que os usuários tenham controle sobre receitas e despesas de maneira prática e eficiente. Com o Fintrack, é possível registrar, visualizar e analisar gastos, receitas e saldos de forma organizada, promovendo uma gestão financeira consciente.

## 1.1 Tecnologias Utilizadas

### 1.1.1 Frontend

- **Framework**: Angular
- **Biblioteca de Componentes**: PrimeNG
- **Template Utilizado**: Sakai

### 1.1.2 Backend

- **Framework**: Node.js com Express.js

### 1.1.3 Banco de dados

- **Banco de dados Utilizado**: MongoDB

### 1.1.4 Hospedagem

- **Frontend e Backend**: Vercel
- **Banco de dados**: Railway

# 2. Instalação e Execução

## 2.1 Requisitos

- Node.js
- NPM (Node Package Manager)

## 2.2 Passos

1. Clone o repositório do projeto que está no GitHub: [https://github.com/pedroluizforlan/gerenciador.git](https://github.com/pedroluizforlan/gerenciador.git)
2. No seu bash execute `npm install` para instalar as dependências do projeto.
3. Para executar o Backend digite no seu bash `npm start`.
4. Para executar o Frontend digite no seu bash `npm start`.

# 3. Endpoints da API

## 3.1 Usuários

### 3.1.1 Criar Usuário

- **Método**: POST
- **Rota**: /usuarios
- **Descrição**: Cria um novo usuário no sistema.
- **Body (JSON)**:

    ```json
    json
    Copiar código
    {
      "nome": "string",
      "email": "string",
      "senha": "string"
    }
    
    ```

- **Respostas**:
  - 201: Usuário criado com sucesso.
  - 400: Preencha todos os campos obrigatórios.

### 3.1.2 Login de Usuário

- **Método**: POST
- **Rota**: /login
- **Descrição**: Realiza login e retorna um token de autenticação.
- **Body (JSON)**:

    ```json
    json
    Copiar código
    {
      "email": "string",
      "senha": "string"
    }
    
    ```

- **Respostas**:
  - 200: Login bem-sucedido, retorna token.
  - 400: Preencha todos os campos obrigatórios.
  - 404: Usuário não encontrado.
  - 401: Senha inválida.

## 3.2 Gastos

### 3.2.1 Criar Gasto

- **Método**: POST
- **Rota**: /gastos
- **Descrição**: Registra um novo gasto.
- **Body (JSON)**:

    ```json
    json
    Copiar código
    {
      "userId": "string",
      "valor": "number",
      "titulo": "string",
      "categoria": "string",
      "data": "date"
    }
    
    ```

- **Respostas**:
  - 201: Gasto registrado com sucesso.
  - 400: Preencha todos os campos obrigatórios.

### 3.2.2 Listar Gastos

- **Método**: GET
- **Rota**: /gastos
- **Descrição**: Lista todos os gastos do usuário autenticado.
- **Headers**:

    ```json
    json
    Copiar código
    {
      "Authorization": "Bearer <token>"
    }
    
    ```

- **Respostas**:
  - 200: Lista de gastos.
  - 500: Erro interno do servidor.

### 3.2.3 Editar Gasto

- **Método**: PUT
- **Rota**: /gastos/:id
- **Descrição**: Edita um gasto existente.
- **Body (JSON)**:

    ```json
    json
    Copiar código
    {
      "titulo": "string",
      "categoria": "string",
      "data": "date"
    }
    
    ```

- **Respostas**:
  - 200: Gasto atualizado com sucesso.
  - 404: Gasto não encontrado.
  - 500: Erro interno do servidor.

### 3.2.4 Excluir Gasto

- **Método**: DELETE
- **Rota**: /gastos/:id
- **Descrição**: Exclui um gasto pelo ID.
- **Respostas**:
  - 200: Gasto removido com sucesso.
  - 404: Gasto não encontrado.
  - 500: Erro interno do servidor.

### 3.2.5 Total de Gastos por Mês

- **Método**: GET
- **Rota**: /gastos/:ano/:mes
- **Descrição**: Retorna o total de gastos de um mês específico.
- **Respostas**:
  - 200: Total de gastos.
  - 400: Ano ou mês inválidos.
  - 500: Erro interno do servidor.

### 3.2.6 Contar Categorias

- **Método**: GET
- **Rota**: /gastos/categorias
- **Descrição**: Retorna a contagem de gastos por categoria.
- **Respostas**:
  - 200: Contagem por categoria.
  - 500: Erro interno do servidor.

## 3.3 Saldos

### 3.3.1 Criar Saldo

- **Método**: POST
- **Rota**: /saldos
- **Descrição**: Cria um saldo mensal.
- **Body (JSON)**:

    ```json
    json
    Copiar código
    {
      "valor": "number",
      "mes": "date"
    }
    
    ```

- **Respostas**:
  - 201: Saldo registrado com sucesso.
  - 400: Preencha todos os campos obrigatórios.

### 3.3.2 Listar Saldos

- **Método**: GET
- **Rota**: /saldos
- **Descrição**: Lista os saldos do usuário autenticado.
- **Respostas**:
  - 200: Lista de saldos.
  - 500: Erro interno do servidor.

### 3.3.3 Editar Saldo

- **Método**: PUT
- **Rota**: /saldos/:id
- **Descrição**: Edita um saldo existente.
- **Body (JSON)**:

    ```json
    json
    Copiar código
    {
      "valor": "number",
      "mes": "date"
    }
    
    ```

- **Respostas**:
  - 200: Saldo atualizado com sucesso.
  - 404: Saldo não encontrado.
  - 500: Erro interno do servidor.

### 3.3.4 Saldo por Mês

- **Método**: GET
- **Rota**: /saldos/:ano/:mes
- **Descrição**: Retorna o saldo de um mês específico.
- **Respostas**:
  - 200: Saldo do mês especificado.
  - 404: Saldo não encontrado.
  - 500: Erro interno do servidor.
