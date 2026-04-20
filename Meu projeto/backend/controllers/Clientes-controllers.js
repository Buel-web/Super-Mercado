const Cliente = require('../models/Clientes-models');

const ClienteController = {
  listar: (req, res) => {
    const clientes = Cliente.listar();
    res.json(clientes);
  },

  buscarPorId: (req, res) => {
    const cliente = Cliente.buscarPorId(req.params.id);
    if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json(cliente);
  },

  criar: (req, res) => {
    const { nome, cpf, idade, tempo_cliente } = req.body;
    if (!nome || !cpf)
      return res.status(400).json({ erro: 'Nome e CPF são obrigatórios' });

    const resultado = Cliente.criar({ nome, cpf, idade, tempo_cliente });
    res.status(201).json({ mensagem: 'Cliente criado!', id: resultado.lastInsertRowid });
  },

  atualizar: (req, res) => {
    const { nome, cpf, idade, tempo_cliente } = req.body;
    Cliente.atualizar(req.params.id, { nome, cpf, idade, tempo_cliente });
    res.json({ mensagem: 'Cliente atualizado!' });
  },

  deletar: (req, res) => {
    Cliente.deletar(req.params.id);
    res.json({ mensagem: 'Cliente removido!' });
  }
};

module.exports = ClienteController;