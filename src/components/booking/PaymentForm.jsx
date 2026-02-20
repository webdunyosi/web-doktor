import { useState } from 'react';
import { PAYMENT_CARD, PAYMENT_CARD_OWNER } from '../../data/initialData';
import { sendPhotoToTelegram } from '../../utils/telegram';

export default function PaymentForm({ appointment, onClose }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(f);
  }

  function copyCard() {
    navigator.clipboard.writeText(PAYMENT_CARD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const caption =
      `💳 <b>Yangi to'lov cheki!</b>\n` +
      `👤 Bemor: ${appointment.userFullName}\n` +
      `📱 Telefon: ${appointment.userPhone}\n` +
      `👨‍⚕️ Shifokor: ${appointment.doctorName} (${appointment.doctorSpecialty})\n` +
      `📅 Sana: ${appointment.date} ${appointment.time}\n` +
      `📝 Shikoyat: ${appointment.complaint}`;
    await sendPhotoToTelegram(file, caption);
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="text-center py-6 space-y-4">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Muvaffaqiyatli!</h3>
        <p className="text-sm text-gray-600">
          Chek yuborildi. Tez orada shifokor siz bilan bog'lanadi.
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold transition-colors"
        >
          Yopish
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl p-5 text-white">
        <p className="text-xs opacity-80 mb-1">To'lov kartasi</p>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xl font-mono font-bold tracking-wider">{PAYMENT_CARD}</span>
          <button
            onClick={copyCard}
            className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
          >
            {copied ? '✓ Nusxalandi' : 'Nusxalash'}
          </button>
        </div>
        <p className="text-xs opacity-80 mt-2">Karta egasi: {PAYMENT_CARD_OWNER}</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        ⚠️ Yuqoridagi kartaga to'lov qiling va chek (screenshot) yuboring.
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            To'lov cheki (rasm)
          </label>
          <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-all">
            {preview ? (
              <img src={preview} alt="preview" className="h-full w-full object-contain rounded-xl p-1" />
            ) : (
              <div className="text-center">
                <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-500">Rasmni tanlash uchun bosing</p>
              </div>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            disabled={!file || loading}
            className="flex-1 py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white rounded-xl transition-colors font-semibold"
          >
            {loading ? 'Yuborilmoqda...' : 'Chekni yuborish'}
          </button>
        </div>
      </form>
    </div>
  );
}
