const Usuario = require('../models/Usuarios-models');
const bcrypt = require('bcrypt');

const UsuarioController = {
  listar: (req, res) => {
    const usuarios = Usuario.listar();
    res.json(usuarios);
  },

  buscarPorId: (req, res) => {
    const usuario = Usuario.buscarPorId(req.params.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(usuario);
  },

  criar: async (req, res) => {
  try {
    console.log('Body recebido:', req.body);
    const { nome, email, senha, cpf } = req.body;
    
    if (!nome || !email || !senha || !cpf)
      return res.status(400).json({ erro: 'Preencha todos os campos' });

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const resultado = Usuario.criar({ nome, email, senha: senhaCriptografada, cpf });
    res.status(201).json({ mensagem: 'Usuário criado!', id: resultado.lastInsertRowid });
  } catch(e) {
    console.log('Erro ao criar usuário:', e.message);
    res.status(500).json({ erro: e.message });
  }
},

  atualizar: (req, res) => {
    const { nome, email, cpf } = req.body;
    Usuario.atualizar(req.params.id, { nome, email, cpf });
    res.json({ mensagem: 'Usuário atualizado!' });
  },

  deletar: (req, res) => {
    Usuario.deletar(req.params.id);
    res.json({ mensagem: 'Usuário removido!' });
  }
};

module.exports = UsuarioController;