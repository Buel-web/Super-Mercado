const db = require('../db');

const Cliente = {
  criar: (dados) => {
    const stmt = db.prepare(
      `INSERT INTO clientes (nome, cpf, idade, tempo_cliente) VALUES (?, ?, ?, ?)`
    );
    return stmt.run(dados.nome, dados.cpf, dados.idade, dados.tempo_cliente);
  },

  listar: () => {
    return db.prepare(`SELECT * FROM clientes`).all();
  },

  buscarPorId: (id) => {
    return db.prepare(`SELECT * FROM clientes WHERE id = ?`).get(id);
  },

  atualizar: (id, dados) => {
    const stmt = db.prepare(
      `UPDATE clientes SET nome=?, cpf=?, idade=?, tempo_cliente=? WHERE id=?`
    );
    return stmt.run(dados.nome, dados.cpf, dados.idade, dados.tempo_cliente, id);
  },

  deletar: (id) => {
    return db.prepare(`DELETE FROM clientes WHERE id = ?`).run(id);
  }
};

module.exports = Cliente;