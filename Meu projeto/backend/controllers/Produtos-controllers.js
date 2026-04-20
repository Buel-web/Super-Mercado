const Produto = require('../models/Produtos-models');

const ProdutoController = {
  listar: (req, res) => {
    try {
      const produtos = Produto.listar();
      res.json(produtos);
    } catch(e) { res.status(500).json({ erro: e.message }); }
  },

  buscarPorId: (req, res) => {
    try {
      const produto = Produto.buscarPorId(req.params.id);
      if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
      res.json(produto);
    } catch(e) { res.status(500).json({ erro: e.message }); }
  },

  criar: (req, res) => {
    try {
      const { nome, preco_atual, preco_promocao, tipo, descricao, data_validade } = req.body;
      if (!nome || !preco_atual)
        return res.status(400).json({ erro: 'Nome e preço são obrigatórios' });
      const resultado = Produto.criar({ nome, preco_atual, preco_promocao, tipo, descricao, data_validade });
      res.status(201).json({ mensagem: 'Produto criado!', id: resultado.lastInsertRowid });
    } catch(e) { res.status(500).json({ erro: e.message }); }
  },

  atualizar: (req, res) => {
    try {
      const { nome, preco_atual, preco_promocao, tipo, descricao, data_validade } = req.body;
      Produto.atualizar(req.params.id, { nome, preco_atual, preco_promocao, tipo, descricao, data_validade });
      res.json({ mensagem: 'Produto atualizado!' });
    } catch(e) { res.status(500).json({ erro: e.message }); }
  },

  aplicarPromocao: (req, res) => {
    try {
      const { preco_promocao } = req.body;
      if (!preco_promocao)
        return res.status(400).json({ erro: 'Informe o preço promocional' });
      Produto.aplicarPromocao(req.params.id, preco_promocao);
      res.json({ mensagem: 'Promoção aplicada!' });
    } catch(e) { res.status(500).json({ erro: e.message }); }
  },

  removerPromocao: (req, res) => {
    try {
      Produto.removerPromocao(req.params.id);
      res.json({ mensagem: 'Promoção removida!' });
    } catch(e) { res.status(500).json({ erro: e.message }); }
  },

  deletar: (req, res) => {
    try {
      Produto.deletar(req.params.id);
      res.json({ mensagem: 'Produto removido!' });
    } catch(e) { res.status(500).json({ erro: e.message }); }
  }
};

module.exports = ProdutoController;