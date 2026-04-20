import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nome: '', email: '', senha: '', cpf: '' });
  const [editando, setEditando] = useState(null);
  const [detalhe, setDetalhe] = useState(null);
  const navigate = useNavigate();

  const carregarUsuarios = async () => {
    const res = await axios.get('http://localhost:3001/api/usuarios');
    setUsuarios(res.data);
  };

  useEffect(() => { carregarUsuarios(); }, []);

  const salvar = async () => {
    if (editando) {
      await axios.put(`http://localhost:3001/api/usuarios/${editando}`, form);
    } else {
      await axios.post('http://localhost:3001/api/usuarios', form);
    }
    setForm({ nome: '', email: '', senha: '', cpf: '' });
    setEditando(null);
    carregarUsuarios();
  };

  const deletar = async (id) => {
    await axios.delete(`http://localhost:3001/api/usuarios/${id}`);
    carregarUsuarios();
  };

  const editar = (usuario) => {
    setForm(usuario);
    setEditando(usuario.id);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>👥 Usuários</h2>
        <button onClick={() => navigate('/produtos')} style={{ padding: '8px 16px', cursor: 'pointer' }}>🛍️ Produtos</button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h3>{editando ? 'Editar Usuário' : 'Novo Usuário'}</h3>
        <input placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <input placeholder="Senha" type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <input placeholder="CPF" value={form.cpf} onChange={(e) => setForm({ ...form, cpf: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <button onClick={salvar} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {editando ? 'Atualizar' : 'Cadastrar'}
        </button>
        {editando && <button onClick={() => { setEditando(null); setForm({ nome: '', email: '', senha: '', cpf: '' }); }} style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancelar</button>}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#2196F3', color: 'white' }}>
          <tr>
            <th style={{ padding: '12px' }}>Nome</th>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>CPF</th>
            <th style={{ padding: '12px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} style={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
              <td style={{ padding: '12px' }}>{u.nome}</td>
              <td style={{ padding: '12px' }}>{u.email}</td>
              <td style={{ padding: '12px' }}>{u.cpf}</td>
              <td style={{ padding: '12px' }}>
                <button onClick={() => setDetalhe(u)} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Ver</button>
                <button onClick={() => editar(u)} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Editar</button>
                <button onClick={() => deletar(u.id)} style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {detalhe && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '350px' }}>
            <h3>Detalhes do Usuário</h3>
            <p><strong>Nome:</strong> {detalhe.nome}</p>
            <p><strong>Email:</strong> {detalhe.email}</p>
            <p><strong>CPF:</strong> {detalhe.cpf}</p>
            <button onClick={() => setDetalhe(null)} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Usuarios;