import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [contas, setContas] = useState([]);

  useEffect(() => {
    const fetchContas = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/contas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setContas(data);
    };
    fetchContas();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {contas.map((conta, index) => (
          <li key={index}>{conta.nome} - R$ {conta.valor}</li>
        ))}
      </ul>
    </div>
  );
}
