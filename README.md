# EngNet API - Desafio Backend

API desenvolvida para o sistema de gerenciamento de processos internos da EngNet. O sistema gerencia usuários, clientes e processos de reembolso, utilizando uma arquitetura modular baseada em **NestJS**, **TypeORM** e **PostgreSQL**.

## 👥 Autores

- **Gabriel Augusto** - Autenticação JWT e Entidades principais
- **Leonardo Meneses** - CRUD de Usuários

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* **Node.js** (v18 ou superior)
* **Docker** e **Docker Compose**
* **NPM**

---

## 🚀 Como rodar o projeto

Siga os passos abaixo para configurar o ambiente de desenvolvimento do zero.

### 1. Instalação e Configuração de Ambiente

Clone o repositório, instale as dependências e configure as variáveis de ambiente.  
**Instale as dependências:**
```bash
npm install
```
**Configure as variáveis de ambiente:**  
(Crie um arquivo .env baseado no exemplo fornecido)
```bash
cp .env.example .env
```

### 2. Subir o Banco de Dados
Utilize o Docker para subir o container do PostgreSQL.

```bash
docker compose up --build
```

### 3. Criar as Tabelas (Migrations)
Este projeto utiliza Migrations para versionamento do banco de dados.  
**Roda as migrations para criar a estrutura do banco:**
```bash
npm run migration:run
```

### 4. Popular o Banco (Seeders)
Para testar a aplicação, execute o script de seed para criar os Tipos de Despesa e o Usuário Admin padrão.  
**Popula o banco com dados iniciais:**
```bash
npm run seed
```

### 5. Rodar a Aplicação
A API estará rodando na porta 3001 em: http://localhost:3001.  
**Inicia o servidor em modo de desenvolvimento (com watch):**
```bash
npm run start:dev
```
