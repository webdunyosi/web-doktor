import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-500/30">
            <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Web Doktor</h1>
          <p className="text-slate-400 mt-1">Onlayn qabul tizimi</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Tizimga kirish</h2>
          <LoginForm />

          <div className="mt-6 p-4 bg-slate-700/50 rounded-xl">
            <p className="text-xs text-slate-400 font-medium mb-1">Demo hisob:</p>
            <p className="text-xs text-slate-300">Login: <span className="font-mono font-semibold text-sky-400">demo</span></p>
            <p className="text-xs text-slate-300">Parol: <span className="font-mono font-semibold text-sky-400">demo123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
