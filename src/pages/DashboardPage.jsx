import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAppointments } from '../utils/storage';
import Header from '../components/layout/Header';

export default function DashboardPage() {
  const { user } = useAuth();
  const appointments = getAppointments().filter((a) => a.userId === user.id);
  const today = new Date().toISOString().split('T')[0];
  const upcoming = appointments.filter((a) => a.date >= today);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            color="bg-sky-50 border-sky-100"
          />
          <StatCard
            icon="⏳"
            label="Kelgusi qabullar"
            value={upcoming.length}
            color="bg-emerald-50 border-emerald-100"
          />
          <StatCard
            icon="✅"
            label="O'tgan qabullar"
            value={appointments.length - upcoming.length}
            color="bg-violet-50 border-violet-100"
          />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/booking"
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-sky-200 transition-all group"
          >
            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sky-500 transition-colors">
              <svg className="w-6 h-6 text-sky-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Qabulga yozilish</h3>
            <p className="text-sm text-gray-500">Shifokor tanlang va vaqt band qiling</p>
          </Link>

          <Link
            to="/profile"
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-sky-200 transition-all group"
          >
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-500 transition-colors">
              <svg className="w-6 h-6 text-violet-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Profilim</h3>
            <p className="text-sm text-gray-500">Ma'lumotlaringiz va qabullar tarixi</p>
          </Link>
        </div>

        {/* Recent appointments */}
        {upcoming.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Yaqinlashayotgan qabullar</h2>
            <div className="space-y-3">
              {upcoming.slice(0, 3).map((apt) => (
                <div key={apt.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{apt.doctorName}</p>
                    <p className="text-xs text-gray-500">{apt.doctorSpecialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-sky-600">{apt.date}</p>
                    <p className="text-xs text-gray-500">{apt.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`bg-white border ${color} rounded-2xl p-5`}>
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}
