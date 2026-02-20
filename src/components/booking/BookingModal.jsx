import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { saveAppointment } from '../../utils/storage';
import PaymentForm from './PaymentForm';

export default function BookingModal({ slot, onClose }) {
  const { user } = useAuth();
  const [complaint, setComplaint] = useState('');
  const [step, setStep] = useState('form'); // 'form' | 'payment'
  const [appointment, setAppointment] = useState(null);

  function handleConfirm(e) {
    e.preventDefault();
    const apt = {
      id: Date.now().toString(),
      userId: user.id,
      userFullName: user.fullName,
      userPhone: user.phone,
      doctorId: slot.doctor.id,
      doctorName: slot.doctor.name,
      doctorSpecialty: slot.doctor.specialty,
      date: slot.date,
      time: slot.time,
      complaint,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    saveAppointment(apt);
    setAppointment(apt);
    setStep('payment');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">
            {step === 'form' ? 'Qabulga yozilish' : "To'lov"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-700 transition-colors"
          >
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {step === 'form' ? (
            <>
              {/* Slot info */}
              <div className="bg-sky-900/20 border border-sky-800/30 rounded-xl p-4 mb-5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{slot.doctor.name}</p>
                    <p className="text-xs text-slate-400">{slot.doctor.specialty}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-slate-300 pt-1">
                  <span>📅 {slot.date}</span>
                  <span>🕐 {slot.time}</span>
                </div>
              </div>

              <form onSubmit={handleConfirm} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Shikoyat / Muammo
                  </label>
                  <textarea
                    required
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    rows={3}
                    placeholder="Qayeringiz og'riyapti? Muammoingizni yozing..."
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none transition-all text-sm"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors font-medium"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-colors font-semibold"
                  >
                    Tasdiqlash
                  </button>
                </div>
              </form>
            </>
          ) : (
            <PaymentForm appointment={appointment} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}
