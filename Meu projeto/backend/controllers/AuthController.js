const Usuario = require('../models/Usuarios-models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SEGREDO = 'supermercado_secreto';

const AuthController = {
  login: async (req, res) => {
    const { email, senha } = req.body;
    const usuario = Usuario.buscarPorEmail(email);

    if (!usuario)
      return res.status(401).json({ erro: 'Usuário ou senha incorretos' });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta)
      return res.status(401).json({ erro: 'Usuário ou senha incorretos' });

    const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, SEGREDO, { expiresIn: '8h' });
    res.json({ mensagem: 'Login realizado!', token });
  }
};

module.exports = AuthController;