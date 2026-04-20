const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/teste', (req, res) => {
  res.json({ mensagem: 'funcionou!' });
});

try {
  const usuariosRoutes = require('./resources/Usuarios-resources');
  app.use('/api/usuarios', usuariosRoutes);
  console.log('✅ usuarios carregado');
} catch(e) {
  console.log('❌ erro em usuarios:', e.message);
}

try {
  const produtosRoutes = require('./resources/Produtos-resources');
  app.use('/api/produtos', produtosRoutes);
  console.log('✅ produtos carregado');
} catch(e) {
  console.log('❌ erro em produtos:', e.message);
}

try {
  const clientesRoutes = require('./resources/Clientes-resources');
  app.use('/api/clientes', clientesRoutes);
  console.log('✅ clientes carregado');
} catch(e) {
  console.log('❌ erro em clientes:', e.message);
}

try {
  const authRoutes = require('./resources/auth');
  app.use('/api/auth', authRoutes);
  console.log('✅ auth carregado');
} catch(e) {
  console.log('❌ erro em auth:', e.message);
}

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001 🚀');
});