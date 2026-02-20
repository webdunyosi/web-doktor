const navLinks = [
  { label: "Bosh sahifa", href: "#" },
  { label: "Shifokorlar", href: "#" },
  { label: "Xizmatlar", href: "#" },
  { label: "Yangiliklar", href: "#" },
  { label: "Biz haqimizda", href: "#" },
  { label: "Aloqa", href: "#" },
]

const specialties = [
  "Terapevt",
  "Kardiolog",
  "Nevropatolog",
  "Stomatolog",
  "Pediatr",
  "Ginekolog",
  "Ortoped",
  "Dermatolog",
]

const Sidebar = () => {
  return (
    <aside className="w-64 shrink-0 flex flex-col gap-6">
      {/* Navigation */}
      <div className="bg-white rounded-2xl shadow p-5">
        <h2 className="text-lg font-semibold text-blue-700 mb-3">Menyu</h2>
        <nav>
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Specialties */}
      <div className="bg-white rounded-2xl shadow p-5">
        <h2 className="text-lg font-semibold text-blue-700 mb-3">
          Mutaxassisliklar
        </h2>
        <ul className="flex flex-col gap-2">
          {specialties.map((spec) => (
            <li key={spec}>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                {spec}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Appointment CTA */}
      <div className="bg-blue-600 rounded-2xl shadow p-5 text-white">
        <h2 className="text-lg font-semibold mb-2">Qabulga yoziling</h2>
        <p className="text-sm text-blue-100 mb-4">
          Shifokor bilan onlayn maslahat oling yoki qabulga yoziling.
        </p>
        <a
          href="#"
          className="block text-center bg-white text-blue-600 font-semibold rounded-lg py-2 hover:bg-blue-50 transition-colors"
        >
          Qabulga yozilish
        </a>
      </div>
    </aside>
  )
}

export default Sidebar
