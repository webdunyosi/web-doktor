import { isSlotTaken } from '../../utils/storage';
import { TIME_SLOTS } from '../../data/initialData';

function getDaysOfWeek() {
  const days = [];
  const today = new Date();
  // Start from today, show next 6 working days
  let count = 0;
  let offset = 0;
  while (count < 6) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) { // skip weekends
      days.push(d);
      count++;
    }
    offset++;
  }
  return days;
}

const DAY_NAMES = ['Yak', 'Du', 'Se', 'Chor', 'Pay', 'Jum', 'Sha'];
const MONTH_NAMES = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export default function SlotGrid({ doctor, onSelectSlot }) {
  const days = getDaysOfWeek();

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="w-16 p-2 text-xs text-gray-500 font-medium text-left">Vaqt</th>
            {days.map((d) => (
              <th key={formatDate(d)} className="p-2 text-center min-w-[80px]">
                <div className="text-xs text-gray-500 font-medium">{DAY_NAMES[d.getDay()]}</div>
                <div className="text-sm font-semibold text-gray-800">
                  {d.getDate()} {MONTH_NAMES[d.getMonth()]}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIME_SLOTS.map((time) => (
            <tr key={time} className="border-t border-gray-100">
              <td className="p-2 text-xs font-semibold text-gray-600 whitespace-nowrap">{time}</td>
              {days.map((d) => {
                const date = formatDate(d);
                const taken = isSlotTaken(doctor.id, date, time);
                return (
                  <td key={date} className="p-1.5 text-center">
                    <button
                      disabled={taken}
                      onClick={() => onSelectSlot({ doctor, date, time })}
                      className={`w-full py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                        taken
                          ? 'bg-red-100 text-red-500 cursor-not-allowed'
                          : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-500 hover:text-white cursor-pointer'
                      }`}
                    >
                      {taken ? 'Band' : "Bo'sh"}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
