const db = require('../db');

const Usuario = {
  criar: (dados) => {
    const stmt = db.prepare(`INSERT INTO usuarios (nome, email, senha, cpf) VALUES (?, ?, ?, ?)`);
    return stmt.run(dados.nome, dados.email, dados.senha, dados.cpf);
  },
  listar: () => db.prepare(`SELECT * FROM usuarios`).all(),
  buscarPorId: (id) => db.prepare(`SELECT * FROM usuarios WHERE id = ?`).get(id),
  buscarPorEmail: (email) => db.prepare(`SELECT * FROM usuarios WHERE email = ?`).get(email),
  atualizar: (id, dados) => {
    const stmt = db.prepare(`UPDATE usuarios SET nome=?, email=?, cpf=? WHERE id=?`);
    return stmt.run(dados.nome, dados.email, dados.cpf, id);
  },
  deletar: (id) => db.prepare(`DELETE FROM usuarios WHERE id = ?`).run(id)
};

module.exports = Usuario;