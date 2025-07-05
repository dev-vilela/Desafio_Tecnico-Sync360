const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Servir arquivos frontend e imagens
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuração do multer (armazenamento)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'backend/uploads'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

//  Conexão com banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'desafio',
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao MySQL');
});

//  GET - carregar perfil
app.get('/api/user', (req, res) => {
  db.query("SELECT * FROM users WHERE id = 1", (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar usuário' });

    const user = results[0];

    res.json({
      name: user.name,
      age: user.age,
      bio: user.bio,
      rua: user.rua,
      bairro: user.bairro,
      estado: user.estado,
      image: user.image
    });
  });
});


// PUT - atualizar perfil com imagem e campos separados de endereço (Aqui eu consigo salvar no BD)
app.put('/api/user', upload.single('image'), (req, res) => {
  const { name, age, bio, rua, bairro, estado } = req.body;
  let imagePath = req.body.currentImage;

  if (req.file) {
    imagePath = `/uploads/${req.file.filename}`;
  }

  const sql = `
    UPDATE users 
    SET name = ?, age = ?, bio = ?, rua = ?, bairro = ?, estado = ?, image = ? 
    WHERE id = 1
  `;

  db.query(sql, [name, age, bio, rua, bairro, estado, imagePath], (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao atualizar' });
    res.json({ message: 'Atualizado com sucesso', image: imagePath });
  });
});

// Start
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
