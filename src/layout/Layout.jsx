import Sidebar from "./Sidebar"

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 pt-16 md:pt-6">
        {children}
      </main>
    </div>
  )
}

export default Layout
