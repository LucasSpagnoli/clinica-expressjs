# 🏥 Clinica Express API

API REST profissional para gerenciamento de clínicas médicas, focada em agendamentos inteligentes, controle de disponibilidade e autenticação robusta.

---

## ⭐ Melhores Práticas Implementadas

Este projeto foi construído seguindo padrões de **Clean Architecture** e **S.O.L.I.D.**, garantindo escalabilidade e facilidade de manutenção:

* **Service Layer:** Toda a lógica de negócio é isolada dos controllers, garantindo um código desacoplado e fácil de testar.
* **Global Error Handling:** Tratamento de erros centralizado via Middleware e classes de erro customizadas (`ServiceError`).
* **Async Wrapper:** Uso de um wrapper `catchAsync` para eliminar a redundância de blocos `try/catch` nos controllers.
* **Security (RBAC):** Autenticação via JWT com distinção de cargos (**Admin, Doctor, Patient**) e sistema de **Silent Refresh Tokens** (Whitelist no MongoDB).
* **Validation & Integrity:** Esquemas de validação rigorosos com `express-validator` e integridade de dados via **Regex** diretamente no Mongoose.
* **Agendamento Inteligente:** Algoritmo para validação de disponibilidade médica cruzando dias da semana e horários em formato UTC.

---

## ⚒️ Tecnologias e Ferramentas

* **Node.js & Express:** Core da aplicação e roteamento.
* **MongoDB & Mongoose:** Banco de dados NoSQL e modelagem de dados.
* **JWT (JSON Web Token):** Segurança e persistência de sessão.
* **Bcrypt:** Hashing de senhas para armazenamento seguro.
* **Express-validator:** Sanitização e validação de inputs.

---

## ▶️ Como Rodar o Projeto

### 1. Clonagem e Dependências
```bash
git clone https://github.com/LucasSpagnoli/clinica-expressjs.git
cd clinica-expressjs
npm install
```

### 2. Configuração de Ambiente
Crie um arquivo .env na raiz do projeto com as seguintes chaves:
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/clinica
ACCESS_TOKEN_SECRET=sua_chave_secreta_acesso
REFRESH_TOKEN_SECRET=sua_chave_secreta_refresh
```

### 3. Configuração de Ambiente
Execute o script de semente (seed) para criar o administrador padrão e inicie o servidor:
```bash
# Criar admin inicial
node src/seedAdmin.js

# Rodar em modo de desenvolvimento
npm run dev
```
