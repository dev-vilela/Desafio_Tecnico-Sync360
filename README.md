
# 🧑‍💻 Projeto: Perfil de Usuário

Este projeto é um sistema completo de cadastro e edição de perfil de usuário, com imagem, dados pessoais e endereço, utilizando:

- ⚙️ **Node.js + Express** no backend  
- 🐬 **MySQL** para banco de dados  
- 🌐 **HTML + Tailwind CSS + JavaScript** no frontend  
- 📁 Upload local de imagem com `multer`  

---

## 📸 Tela do projeto

 <img src="img/perfil.png" alt="">
 <img src="img/edicao.png" alt="">

---

## 🚀 Funcionalidades

✅ Visualização do perfil  
✅ Edição de nome, idade, biografia e endereço (rua, bairro, estado)  
✅ Upload de imagem de perfil local  
✅ Salvamento direto no MySQL  
✅ API REST (GET e PUT)  
✅ Interface responsiva com Tailwind CSS

---

## 🛠️ Tecnologias Usadas

| Área        | Tecnologias                     |
|-------------|---------------------------------|
| **Frontend** | HTML, Tailwind CSS, JavaScript |
| **Backend**  | Node.js, Express, Multer       |
| **Banco**    | MySQL                          |

---

## 📁 Estrutura de Pastas

USER-PROFILE-APP/
├── backend/
│   ├── uploads/               # Imagens salvas via multer
│   ├── db.js                  # Conexão com o banco de dados MySQL
│   ├── server.js              # Servidor Express e rotas da API
├── frontend/
│   ├── css/
│   │   └── style.css          # Estilos customizados (opcional, pois usa Tailwind)
│   ├── js/
│   │   └── script.js          # Scripts JS do frontend (fetch API, DOM)
│   └── index.html             # Interface principal com Tailwind
├── node_modules/              # Módulos do Node
├── package.json               # Dependências e scripts npm
├── package-lock.json          # Detalhes do lock de versões
└── README.md                  # Documentação do projeto ✅

```

---

## 🔧 Instalação Local

### Pré-requisitos

- Node.js instalado
- MySQL funcionando na sua máquina

### 1. Clone o projeto

```bash
git clone https://github.com/dev-vilela/Desafio_Tecnico-Sync360.git
cd nome-do-repo
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Acesse seu MySQL e rode esse script:

```sql
CREATE DATABASE IF NOT EXISTS desafio;
USE desafio;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  rua VARCHAR(100),
  bairro VARCHAR(100),
  estado VARCHAR(100),
  bio TEXT,
  image TEXT
);

INSERT INTO users (name, age, rua, bairro, estado, bio, image)
VALUES ('Paulo Vilela', 22, 'Rua 258', 'Centro', 'Brasília', 'Biografia do usuário...', '');
```

### 4. Ajuste as credenciais do banco

Abra o arquivo `backend/server.js` e atualize:

```js
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'desafio',
});
```

---

### 5. Inicie o servidor

```bash
node backend/server.js
```

Abra no navegador:  
👉 http://localhost:3000

---

## 📡 Rotas da API

| Método | Rota             | Descrição                  |
|--------|------------------|----------------------------|
| GET    | `/api/user`      | Buscar dados do usuário    |
| PUT    | `/api/user`      | Atualizar perfil + imagem  |

---

## 🪪 Licença

Este projeto está sob a licença MIT.  
Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Paulo Vilela**  
Desenvolvedor | Formado em ADS | Engenharia de Software (4/8)  
📧 paulofurtado320gmail.com 
🔗 [LinkedIn](https://www.linkedin.com/in/paulo-vilela-18126922b/)
