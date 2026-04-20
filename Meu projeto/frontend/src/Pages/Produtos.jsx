import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ nome: '', preco_atual: '', tipo: '', descricao: '', data_validade: '' });
  const [editando, setEditando] = useState(null);
  const navigate = useNavigate();

  const carregarProdutos = async () => {
    const res = await axios.get('http://localhost:3001/api/produtos');
    setProdutos(res.data);
  };

  useEffect(() => { carregarProdutos(); }, []);

  const salvar = async () => {
    if (editando) {
      await axios.put(`http://localhost:3001/api/produtos/${editando}`, form);
    } else {
      await axios.post('http://localhost:3001/api/produtos', form);
    }
    setForm({ nome: '', preco_atual: '', tipo: '', descricao: '', data_validade: '' });
    setEditando(null);
    carregarProdutos();
  };

  const deletar = async (id) => {
    await axios.delete(`http://localhost:3001/api/produtos/${id}`);
    carregarProdutos();
  };

  const editar = (produto) => {
    setForm(produto);
    setEditando(produto.id);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>🛍️ Produtos</h2>
        <div>
          <button onClick={() => navigate('/usuarios')} style={{ marginRight: '10px', padding: '8px 16px', cursor: 'pointer' }}>👥 Usuários</button>
          <button onClick={() => navigate('/promocoes')} style={{ padding: '8px 16px', cursor: 'pointer' }}>🏷️ Promoções</button>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h3>{editando ? 'Editar Produto' : 'Novo Produto'}</h3>
        <input placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <input placeholder="Preço atual" type="number" value={form.preco_atual} onChange={(e) => setForm({ ...form, preco_atual: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <input placeholder="Tipo" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <input placeholder="Descrição" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <input placeholder="Data de validade" type="date" value={form.data_validade} onChange={(e) => setForm({ ...form, data_validade: e.target.value })} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <button onClick={salvar} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {editando ? 'Atualizar' : 'Cadastrar'}
        </button>
        {editando && <button onClick={() => { setEditando(null); setForm({ nome: '', preco_atual: '', tipo: '', descricao: '', data_validade: '' }); }} style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#ccc', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancelar</button>}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#4CAF50', color: 'white' }}>
          <tr>
            <th style={{ padding: '12px' }}>Nome</th>
            <th style={{ padding: '12px' }}>Preço</th>
            <th style={{ padding: '12px' }}>Promoção</th>
            <th style={{ padding: '12px' }}>Tipo</th>
            <th style={{ padding: '12px' }}>Validade</th>
            <th style={{ padding: '12px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
              <td style={{ padding: '12px' }}>{p.nome}</td>
              <td style={{ padding: '12px' }}>R$ {p.preco_atual}</td>
              <td style={{ padding: '12px' }}>{p.preco_promocao ? `R$ ${p.preco_promocao}` : '-'}</td>
              <td style={{ padding: '12px' }}>{p.tipo}</td>
              <td style={{ padding: '12px' }}>{p.data_validade}</td>
              <td style={{ padding: '12px' }}>
                <button onClick={() => editar(p)} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Editar</button>
                <button onClick={() => deletar(p.id)} style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Produtos;