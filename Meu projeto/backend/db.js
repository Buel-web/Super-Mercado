const Database = require('better-sqlite3');
const db = new Database('supermercado.db');

// Criando as tabelas automaticamente
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    cpf TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco_atual REAL NOT NULL,
    preco_promocao REAL,
    tipo TEXT,
    descricao TEXT,
    data_validade TEXT
  );

  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT NOT NULL,
    idade INTEGER,
    tempo_cliente INTEGER
  );
`);

module.exports = db;