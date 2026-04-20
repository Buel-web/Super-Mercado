import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Produtos from './Pages/Produtos';
import Usuarios from './Pages/Usuarios';
import Promocoes from './Pages/Promocoes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/promocoes" element={<Promocoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;