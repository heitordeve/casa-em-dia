import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });
    if (res.status === 201) {
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } else {
      alert('Erro ao cadastrar');
    }
  };

  return (
    <div>
      <h2>Registrar</h2>
      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button onClick={handleRegister}>Cadastrar</button>
    </div>
  );
}