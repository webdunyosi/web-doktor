import { useState } from 'react';
import { DOCTORS } from '../data/initialData';
import Layout from '../components/layout/Layout';
import SlotGrid from '../components/booking/SlotGrid';
import BookingModal from '../components/booking/BookingModal';

export default function BookingPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(DOCTORS[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleSelectSlot(slot) {
    setSelectedSlot(slot);
  }

  function handleCloseModal() {
    setSelectedSlot(null);
    setRefreshKey((k) => k + 1); // re-render SlotGrid to reflect booked slot
  }

  const specialtyColors = {
    Terapevt: 'bg-sky-100 text-sky-700',
    Kardiolog: 'bg-rose-100 text-rose-700',
    Nevropatolog: 'bg-violet-100 text-violet-700',
  };

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Qabulga yozilish</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Doctor list */}
          <div className="lg:w-72 flex-shrink-0">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Shifokorlar
            </h2>
            <div className="space-y-3">
              {DOCTORS.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selectedDoctor.id === doc.id
                      ? 'bg-sky-500 border-sky-500 text-white shadow-md'
                      : 'bg-white border-gray-200 hover:border-sky-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      selectedDoctor.id === doc.id ? 'bg-white/20' : 'bg-sky-100'
                    }`}>
                      <svg className={`w-5 h-5 ${selectedDoctor.id === doc.id ? 'text-white' : 'text-sky-600'}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${selectedDoctor.id === doc.id ? 'text-white' : 'text-gray-900'}`}>
                        {doc.name}
                      </p>
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-0.5 ${
                        selectedDoctor.id === doc.id
                          ? 'bg-white/20 text-white'
                          : (specialtyColors[doc.specialty] || 'bg-gray-100 text-gray-600')
                      }`}>
                        {doc.specialty}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-4 space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Belgilar</p>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-100 border border-emerald-200 rounded" />
                <span className="text-xs text-gray-600">Bo'sh vaqt</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border border-red-200 rounded" />
                <span className="text-xs text-gray-600">Band vaqt</span>
              </div>
            </div>
          </div>

          {/* Slot grid */}
          <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{selectedDoctor.name}</h2>
                <p className="text-sm text-gray-500">{selectedDoctor.specialty} – Qabul jadvali</p>
              </div>
            </div>
            <SlotGrid key={refreshKey} doctor={selectedDoctor} onSelectSlot={handleSelectSlot} />
          </div>
        </div>
      </main>

      {selectedSlot && (
        <BookingModal slot={selectedSlot} onClose={handleCloseModal} />
      )}
    </Layout>
  );
}
