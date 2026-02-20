import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', phone: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
      return;
    }
    setLoading(true);
    const result = await register(form);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  }

  const field = (label, key, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      <input
        type={type}
        required
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {field('To\'liq ism', 'fullName', 'text', 'Ism Familiya')}
      {field('Telefon raqam', 'phone', 'tel', '+998901234567')}
      {field('Foydalanuvchi nomi', 'username', 'text', 'username')}
      {field('Parol', 'password', 'password', '••••••••')}

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
        {loading ? "Ro'yxatdan o'tilmoqda..." : "Ro'yxatdan o'tish"}
      </button>

      <p className="text-center text-sm text-slate-400">
        Hisobingiz bormi?{' '}
        <Link to="/" className="text-sky-400 hover:text-sky-300 font-medium">
          Kirish
        </Link>
      </p>
    </form>
  );
}
