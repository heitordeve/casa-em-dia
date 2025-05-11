// src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Falha na autenticação');
      }

      const data = await response.json();
      login(data.token);
      navigate('/dashboard');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Email ou senha incorretos');
    }
  };

  return (

      <div className="page">
      <div className="login-container">
        {/* Logo Casa em Dia */}
        <div className="logo-container">
          <svg className="logo" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 40L20 100H40V180H160V100H180L100 40Z" fill="#4A90E2"/>
            <rect x="80" y="120" width="40" height="60" fill="#3A7BC8"/>
            <path d="M70 100L90 130L130 70" stroke="white" stroke-width="10" stroke-linecap="round"/>
          </svg>
          <h1 className="logo-text">Casa em Dia</h1>
        </div>

        <form onSubmit={handleSubmit} className="formLogin">
          <p>Organize sua casa de forma simples e eficiente</p>
          
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <a href="/" className="forgot-password">Esqueci minha senha</a>
          <button type="submit" className="btn">Acessar</button>
        </form>
      </div>
    </div>
    // <div className="login-container">
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //     <input
    //       type="password"
    //       placeholder="Senha"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //     <button type="submit">Entrar</button>
    //   </form>
    // </div>
  );
}

