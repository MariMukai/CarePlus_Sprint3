import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function Login() {
  const { login, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Preencha usuário e senha para continuar.');
      return;
    }
    if (username.trim() === 'ana.martins' && password === '123456') {
      login(username.trim());
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
      return;
    }
    setError('Credenciais inválidas. Use ana.martins / 123456 para testar.');
  };

  const handleForgot = () => {
    alert('Um link de recuperação foi enviado para o e-mail cadastrado no convênio.');
  };

  return (
    <main className="login-screen">
      <section className="login-card reveal" aria-labelledby="login-title">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div style={{
            width: 56, height: 56, borderRadius: 18,
            background: 'linear-gradient(135deg, #1c9770, #93cb52)',
            display: 'grid', placeItems: 'center', fontSize: 28,
            boxShadow: '0 12px 30px rgba(28,151,112,0.35)'
          }}>🌱</div>
          <div>
            <span className="eyebrow">Acesso do beneficiário</span>
            <h1 id="login-title" className="h3 fw-bold mt-2 mb-0">Entrar no CarePlus Journey</h1>
          </div>
        </div>

        <p style={{ color: '#435d50', fontSize: 14.5, marginBottom: 24 }}>
          Use suas credenciais do convênio para acessar missões, pontuação,
          jornada ativa e progresso da Flora.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold" style={{ fontSize: 13, color: '#11614a' }}>
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ana.martins"
              autoComplete="username"
              className="form-control form-control-lg"
              style={{ borderRadius: 12, borderColor: 'rgba(28,151,112,0.2)' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold" style={{ fontSize: 13, color: '#11614a' }}>
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              autoComplete="current-password"
              className="form-control form-control-lg"
              style={{ borderRadius: 12, borderColor: 'rgba(28,151,112,0.2)' }}
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2 px-3" role="alert" style={{ fontSize: 13, borderRadius: 10 }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-cp btn-cp-primary btn-cp-lg w-100 mt-2">
            Acessar plataforma →
          </button>
        </form>

        <button
          type="button"
          onClick={handleForgot}
          className="btn btn-link w-100 mt-3"
          style={{ color: '#157a5b', textDecoration: 'none', fontWeight: 600, fontSize: 14 }}
        >
          Esqueci minha senha
        </button>

        <div className="mt-4 p-3" style={{ background: '#f6f9f5', borderRadius: 14, border: '1px dashed rgba(28,151,112,0.2)' }}>
          <strong style={{ fontSize: 12, color: '#11614a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Dados para teste
          </strong>
          <div style={{ fontSize: 13, marginTop: 4, color: '#435d50' }}>
            Usuário: <code>ana.martins</code> · Senha: <code>123456</code>
          </div>
        </div>
      </section>
    </main>
  );
}
