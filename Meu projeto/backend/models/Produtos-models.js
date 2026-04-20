const db = require('../db');

const Produto = {
  criar: (dados) => {
    const stmt = db.prepare(`INSERT INTO produtos (nome, preco_atual, preco_promocao, tipo, descricao, data_validade) VALUES (?, ?, ?, ?, ?, ?)`);
    return stmt.run(dados.nome, dados.preco_atual, dados.preco_promocao, dados.tipo, dados.descricao, dados.data_validade);
  },

  listar: () => db.prepare(`SELECT * FROM produtos`).all(),

  buscarPorId: (id) => db.prepare(`SELECT * FROM produtos WHERE id = ?`).get(id),

  atualizar: (id, dados) => {
    const stmt = db.prepare(`UPDATE produtos SET nome=?, preco_atual=?, preco_promocao=?, tipo=?, descricao=?, data_validade=? WHERE id=?`);
    return stmt.run(dados.nome, dados.preco_atual, dados.preco_promocao, dados.tipo, dados.descricao, dados.data_validade, id);
  },

  aplicarPromocao: (id, preco_promocao) => {
    return db.prepare(`UPDATE produtos SET preco_promocao=? WHERE id=?`).run(preco_promocao, id);
  },

  removerPromocao: (id) => {
    return db.prepare(`UPDATE produtos SET preco_promocao=NULL WHERE id=?`).run(id);
  },

  deletar: (id) => db.prepare(`DELETE FROM produtos WHERE id = ?`).run(id)
};

module.exports = Produto;