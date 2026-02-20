import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = login(form.username, form.password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Foydalanuvchi nomi
        </label>
        <input
          type="text"
          required
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="demo"
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Parol
        </label>
        <input
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
        />
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-700/50 text-red-400 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-800 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {loading ? 'Kirish...' : 'Kirish'}
      </button>

      <p className="text-center text-sm text-slate-400">
        Hisobingiz yo'qmi?{' '}
        <Link to="/register" className="text-sky-400 hover:text-sky-300 font-medium">
          Ro'yxatdan o'ting
        </Link>
      </p>
    </form>
  );
}