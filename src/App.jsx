import Sidebar from "./components/Sidebar"

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 text-white py-4 px-6 shadow">
        <h1 className="text-2xl font-bold tracking-wide">Web Doktor</h1>
      </header>

      {/* Main layout */}
      <div className="max-w-6xl mx-auto flex gap-6 p-6">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Xush kelibsiz!
          </h2>
          <p className="text-gray-600">
            Web Doktor — onlayn tibbiy maslahat va qabul xizmati. Chap
            tomonidagi menyudan kerakli bo&apos;limni tanlang.
          </p>
        </main>
      </div>
    </div>
  )
}

export default App