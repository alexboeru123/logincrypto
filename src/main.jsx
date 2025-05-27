import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const response = await fetch(`/${isLogin ? 'login' : 'register'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.error) {
      setError(data.error);
    } else {
      alert(isLogin ? 'Logare reușită!' : 'Înregistrare reușită!');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Logare' : 'Înregistrare'}</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Nume de utilizator"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Parolă"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{isLogin ? 'Loghează-te' : 'Înregistrează-te'}</button>
      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Nu ai cont? Înregistrează-te' : 'Ai deja cont? Loghează-te'}
      </button>
    </form>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
