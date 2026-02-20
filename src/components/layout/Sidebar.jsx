import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PATIENT_NAV = [
  {
    to: '/dashboard',
    label: 'Bosh sahifa',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: '/booking',
    label: 'Qabulga yozilish',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    to: '/profile',
    label: 'Profil',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

const DOCTOR_NAV = [
  {
    to: '/dashboard',
    label: 'Bosh sahifa',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: '/profile',
    label: 'Bemorlar jadvali',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const ADMIN_NAV = [
  {
    to: '/dashboard',
    label: 'Bosh sahifa',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    to: '/admin',
    label: 'Admin paneli',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate('/');
  }

  const navItems =
    user?.role === 'admin' ? ADMIN_NAV :
    user?.role === 'doctor' ? DOCTOR_NAV :
    PATIENT_NAV;

  const avatarColor =
    user?.role === 'admin' ? 'from-violet-400 to-violet-600' :
    user?.role === 'doctor' ? 'from-emerald-400 to-emerald-600' :
    'from-sky-400 to-cyan-500';

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-40 w-64 flex-shrink-0 flex flex-col min-h-screen
      bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
      transform transition-transform duration-300 ease-in-out
      md:static md:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      {/* Logo */}
      <div className="px-5 py-6 flex items-center justify-between">
        <Link to="/dashboard" onClick={onClose} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/30">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-white text-lg leading-none">Web Doktor</span>
            <p className="text-slate-400 text-xs mt-0.5">Tibbiy portal</p>
          </div>
        </Link>
        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-all"
          aria-label="Yopish"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-4" />

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        <p className="px-3 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Menyu</p>
        {navItems.map(({ to, label, icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={`flex-shrink-0 ${active ? 'text-white' : 'text-slate-500'}`}>{icon}</span>
              <span>{label}</span>
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-80" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mt-4 mb-3" />

      {/* User info + logout */}
      <div className="px-3 py-4 space-y-2">
        {/* Avatar + name */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
          <div className={`w-9 h-9 bg-gradient-to-br ${avatarColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
            <span className="text-sm font-bold text-white">
              {user?.fullName?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">{user?.fullName}</p>
            <p className="text-xs text-slate-400 truncate">@{user?.username}</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 ring-2 ring-emerald-400/30" />
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Chiqish
        </button>
      </div>
    </aside>
  );
}