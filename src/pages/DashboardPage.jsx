import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAppointments } from '../utils/storage';
import Layout from '../components/layout/Layout';

export default function DashboardPage() {
  const { user } = useAuth();
  const appointments = getAppointments().filter((a) => a.userId === user.id);
  const today = new Date().toISOString().split('T')[0];
  const upcoming = appointments.filter((a) => a.date >= today);

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-6 mb-8 text-white">
          <h1 className="text-2xl font-bold mb-1">Xush kelibsiz, {user.fullName}! 👋</h1>
          <p className="opacity-90 text-sm">Sog'ligingiz – eng muhim boyligingiz.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon="📅"
            label="Jami qabullar"
            value={appointments.length}
            color="bg-slate-800 border-slate-700"
          />
          <StatCard
            icon="⏳"
            label="Kelgusi qabullar"
            value={upcoming.length}
            color="bg-slate-800 border-slate-700"
          />
          <StatCard
            icon="✅"
            label="O'tgan qabullar"
            value={appointments.length - upcoming.length}
            color="bg-slate-800 border-slate-700"
          />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/booking"
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:shadow-md hover:border-sky-500 transition-all group"
          >
            <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sky-500 transition-colors">
              <svg className="w-6 h-6 text-sky-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-white mb-1">Qabulga yozilish</h3>
            <p className="text-sm text-slate-400">Shifokor tanlang va vaqt band qiling</p>
          </Link>

          <Link
            to="/profile"
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:shadow-md hover:border-violet-500 transition-all group"
          >
            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-500 transition-colors">
              <svg className="w-6 h-6 text-violet-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-white mb-1">Profilim</h3>
            <p className="text-sm text-slate-400">Ma'lumotlaringiz va qabullar tarixi</p>
          </Link>
        </div>

        {/* Recent appointments */}
        {upcoming.length > 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-4">Yaqinlashayotgan qabullar</h2>
            <div className="space-y-3">
              {upcoming.slice(0, 3).map((apt) => (
                <div key={apt.id} className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-xl">
                  <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm truncate">{apt.doctorName}</p>
                    <p className="text-xs text-slate-400">{apt.doctorSpecialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-sky-400">{apt.date}</p>
                    <p className="text-xs text-slate-400">{apt.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`border ${color} rounded-2xl p-5`}>
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </div>
  );
}