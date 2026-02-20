import { useAuth } from '../context/AuthContext';
import { getAppointments } from '../utils/storage';
import Layout from '../components/layout/Layout';

export default function ProfilePage() {
  const { user } = useAuth();
  const appointments = getAppointments()
    .filter((a) => a.userId === user.id)
    .sort((a, b) => {
      const da = new Date(`${a.date}T${a.time}`);
      const db = new Date(`${b.date}T${b.time}`);
      return db - da;
    });

  const today = new Date().toISOString().split('T')[0];

  return (
    <Layout>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 w-full">
        {/* User info card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-white">
                {user.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{user.fullName}</h1>
              <p className="text-sm text-slate-400">@{user.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <InfoRow icon="📱" label="Telefon" value={user.phone || '—'} />
            <InfoRow icon="🔑" label="Login" value={user.username} />
            <InfoRow
              icon="📅"
              label="Ro'yxatdan o'tgan"
              value={user.createdAt ? new Date(user.createdAt).toLocaleDateString('uz-UZ') : '—'}
            />
            <InfoRow icon="📋" label="Jami qabullar" value={appointments.length} />
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Qabullar tarixi</h2>

          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-slate-400 text-sm">Hali qabullar yo'q</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((apt) => {
                const isPast = apt.date < today;
                return (
                  <div
                    key={apt.id}
                    className={`p-4 rounded-xl border ${
                      isPast ? 'bg-slate-700/50 border-slate-600' : 'bg-sky-900/20 border-sky-800/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-white text-sm">{apt.doctorName}</span>
                          <span className="text-xs bg-slate-700 border border-slate-600 px-2 py-0.5 rounded-full text-slate-400">
                            {apt.doctorSpecialty}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">📝 {apt.complaint}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`text-sm font-semibold ${isPast ? 'text-slate-400' : 'text-sky-400'}`}>
                          {apt.date}
                        </p>
                        <p className="text-xs text-slate-500">{apt.time}</p>
                        <span className={`inline-block text-xs mt-1 px-2 py-0.5 rounded-full ${
                          isPast ? 'bg-slate-600 text-slate-300' : 'bg-emerald-900/40 text-emerald-400'
                        }`}>
                          {isPast ? "O'tgan" : 'Kelgusi'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-xl">
      <span className="text-lg">{icon}</span>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}