import { useAuth } from '../context/AuthContext';
import { getUsers, getAppointments } from '../utils/storage';
import Layout from '../components/layout/Layout';

export default function AdminPage() {
  const { user } = useAuth();
  if (user?.role !== 'admin') return null;

  const users = getUsers();
  const appointments = getAppointments();

  const doctors = users.filter((u) => u.role === 'doctor');
  const patients = users.filter((u) => u.role === 'patient');
  const today = new Date().toISOString().split('T')[0];

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-violet-500 to-violet-600 rounded-2xl p-6 mb-8 text-white">
          <h1 className="text-2xl font-bold mb-1">Admin paneli 🛡️</h1>
          <p className="opacity-90 text-sm">Tizim boshqaruvi – barcha foydalanuvchilar va qabullar</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard icon="👥" label="Jami foydalanuvchilar" value={users.length} />
          <StatCard icon="👨‍⚕️" label="Shifokorlar" value={doctors.length} />
          <StatCard icon="🧑" label="Bemorlar" value={patients.length} />
          <StatCard icon="📅" label="Jami qabullar" value={appointments.length} />
        </div>

        {/* Doctors list */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-white mb-4">👨‍⚕️ Shifokorlar ro'yxati</h2>
          {doctors.length === 0 ? (
            <p className="text-slate-400 text-sm">Shifokorlar yo'q</p>
          ) : (
            <div className="space-y-3">
              {doctors.map((doc) => {
                const docAppointments = appointments.filter((a) => a.doctorId === doc.id);
                return (
                  <div key={doc.id} className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-base font-bold text-emerald-400">
                        {doc.fullName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm truncate">{doc.fullName}</p>
                      <p className="text-xs text-slate-400 truncate">
                        🩺 {doc.specialty || '—'} &nbsp;·&nbsp; 🔑 {doc.username}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-emerald-400">{docAppointments.length}</p>
                      <p className="text-xs text-slate-400">qabul</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Patients list */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-white mb-4">🧑 Bemorlar ro'yxati</h2>
          {patients.length === 0 ? (
            <p className="text-slate-400 text-sm">Bemorlar yo'q</p>
          ) : (
            <div className="space-y-3">
              {patients.map((pat) => {
                const patAppointments = appointments.filter((a) => a.userId === pat.id);
                return (
                  <div key={pat.id} className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-xl">
                    <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-base font-bold text-sky-400">
                        {pat.fullName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm truncate">{pat.fullName}</p>
                      <p className="text-xs text-slate-400 truncate">
                        📱 {pat.phone || '—'} &nbsp;·&nbsp; 🔑 {pat.username}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-sky-400">{patAppointments.length}</p>
                      <p className="text-xs text-slate-400">qabul</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* All appointments */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">
            📋 Barcha qabullar
            <span className="ml-2 text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
              {appointments.length}
            </span>
          </h2>
          {appointments.length === 0 ? (
            <p className="text-slate-400 text-sm">Hali qabullar yo'q</p>
          ) : (
            <div className="space-y-3">
              {[...appointments]
                .sort((a, b) => {
                  const da = new Date(`${a.date}T${a.time}`);
                  const db = new Date(`${b.date}T${b.time}`);
                  return db - da;
                })
                .map((apt) => {
                  const isPast = apt.date < today;
                  return (
                    <div
                      key={apt.id}
                      className={`p-4 rounded-xl border ${
                        isPast
                          ? 'bg-slate-700/50 border-slate-600'
                          : 'bg-violet-900/20 border-violet-800/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-white text-sm">{apt.userFullName}</span>
                            <span className="text-xs text-slate-400">→</span>
                            <span className="text-sm text-emerald-400">{apt.doctorName}</span>
                            {apt.doctorSpecialty && (
                              <span className="text-xs bg-slate-700 border border-slate-600 px-2 py-0.5 rounded-full text-slate-400">
                                {apt.doctorSpecialty}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-1">📝 {apt.complaint}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className={`text-sm font-semibold ${isPast ? 'text-slate-400' : 'text-violet-400'}`}>
                            {apt.date}
                          </p>
                          <p className="text-xs text-slate-500">{apt.time}</p>
                          <span
                            className={`inline-block text-xs mt-1 px-2 py-0.5 rounded-full ${
                              isPast
                                ? 'bg-slate-600 text-slate-300'
                                : 'bg-emerald-900/40 text-emerald-400'
                            }`}
                          >
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

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </div>
  );
}
