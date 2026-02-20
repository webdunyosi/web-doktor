const navItems = [
  { icon: "🏠", label: "Bosh sahifa" },
  { icon: "👨‍⚕️", label: "Shifokorlar" },
  { icon: "📅", label: "Uchrashuvlar" },
  { icon: "💊", label: "Dorilar" },
  { icon: "📋", label: "Tibbiy yozuvlar" },
  { icon: "⚙️", label: "Sozlamalar" },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          "fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 flex flex-col transition-transform duration-300",
          "md:static md:translate-x-0 md:shadow-none md:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Logo / Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <span className="text-xl font-bold text-blue-600">🩺 Web Doktor</span>
          <button
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-700 text-2xl leading-none"
            aria-label="Yopish"
          >
            &times;
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-200 text-xs text-gray-400">
          © 2026 Web Doktor
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
