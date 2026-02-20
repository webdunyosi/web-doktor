import { useAuth } from '../context/AuthContext';
import { getAppointments } from '../utils/storage';
import Header from '../components/layout/Header';

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* User info card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-white">
                {user.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{user.fullName}</h1>
              <p className="text-sm text-gray-500">@{user.username}</p>
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
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Qabullar tarixi</h2>

          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">Hali qabullar yo'q</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((apt) => {
                const isPast = apt.date < today;
                return (
                  <div
                    key={apt.id}
                    className={`p-4 rounded-xl border ${
                      isPast ? 'bg-gray-50 border-gray-200' : 'bg-sky-50 border-sky-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm">{apt.doctorName}</span>
                          <span className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded-full text-gray-500">
                            {apt.doctorSpecialty}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">📝 {apt.complaint}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`text-sm font-semibold ${isPast ? 'text-gray-500' : 'text-sky-600'}`}>
                          {apt.date}
                        </p>
                        <p className="text-xs text-gray-400">{apt.time}</p>
                        <span className={`inline-block text-xs mt-1 px-2 py-0.5 rounded-full ${
                          isPast ? 'bg-gray-200 text-gray-600' : 'bg-emerald-100 text-emerald-700'
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
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
      <span className="text-lg">{icon}</span>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}
