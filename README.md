Clinica Express API
API REST para gerenciamento de clínicas médicas, focada em agendamentos, controle de disponibilidade de médicos e autenticação segura.

Melhores Práticas Implementadas
Este projeto foi construído seguindo padrões de Clean Architecture e S.O.L.I.D., garantindo escalabilidade e facilidade de manutenção:

Service Layer: Toda a lógica de negócio é isolada dos controllers.

Global Error Handling: Tratamento de erros centralizado via Middleware e classes de erro customizadas (ServiceError).

Async Wrapper: Uso de catchAsync para eliminar a repetição de blocos try/catch nos controllers.

Security: Autenticação via JWT com sistema de Silent Refresh Tokens (Whitelist no MongoDB) e criptografia de senhas com bcrypt.

Validation: Esquemas de validação rigorosos com express-validator e integridade de dados via Regex no Mongoose.

Tecnologias e Ferramentas
Node.js & Express: Core da aplicação e roteamento.

MongoDB & Mongoose: Banco de dados NoSQL e modelagem de dados.

JWT (JSON Web Token): Segurança e persistência de sessão.

Bcrypt: Hashing de senhas.

Express-validator: Validação de entrada de dados.

Como Rodar o Projeto

Clone o repositório e instale as dependências:
git clone https://github.com/seu-usuario/clinica-express-api.git
cd clinica-express-api
npm install

Crie um arquivo .env na raiz do projeto com as seguintes chaves:
PORT=3000
MONGO_URI=mongodb://localhost:27017/clinica
ACCESS_TOKEN_SECRET=sua_chave_secreta_acesso
REFRESH_TOKEN_SECRET=sua_chave_secreta_refresh

Execute o script de semente (seed) para criar um administrador padrão e rode o servidor:
node src/seedAdmin.js
npm i nodemon
npm run start
