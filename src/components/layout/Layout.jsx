import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        {children}
      </div>
    </div>
  );
}