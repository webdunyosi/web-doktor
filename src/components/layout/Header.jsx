import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PAGE_TITLES = {
  '/dashboard': { title: 'Bosh sahifa', subtitle: 'Umumiy ko\'rinish' },
  '/booking': { title: 'Qabulga yozilish', subtitle: 'Shifokor tanlash va vaqt band qilish' },
  '/profile': { title: 'Profil', subtitle: 'Shaxsiy ma\'lumotlar' },
  '/admin': { title: 'Admin paneli', subtitle: 'Tizim boshqaruvi' },
};

export default function Header({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate('/');
  }

  const page = PAGE_TITLES[location.pathname] || { title: 'Web Doktor', subtitle: '' };
  const initials = user?.fullName
    ?.split(' ')
    .filter((n) => n)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-40 shadow-sm">
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Hamburger menu button (mobile only) */}
        <button
          onClick={onMenuToggle}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-all duration-200 flex-shrink-0"
          aria-label="Menyuni ochish"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Page title */}
        <div className="min-w-0">
          <h1 className="text-base font-bold text-white leading-tight truncate">{page.title}</h1>
          {page.subtitle && (
            <p className="text-xs text-slate-400 leading-tight truncate hidden sm:block">{page.subtitle}</p>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Notification bell */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-all duration-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full ring-2 ring-slate-800" />
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-slate-700" />

          {/* User info */}
          <div className="flex items-center gap-2.5 pl-1">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white leading-tight">{user?.fullName}</p>
              <p className="text-xs text-slate-400 leading-tight">@{user?.username}</p>
            </div>
            <Link
              to="/profile"
              className="w-9 h-9 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 transition-shadow"
            >
              <span className="text-xs font-bold text-white">{initials}</span>
            </Link>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            title="Chiqish"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}