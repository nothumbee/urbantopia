import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div>
      <Header />

      {children}

      <footer className="text-center bg-slate-700 text-white py-4">
        &copy; {new Date().getFullYear()} Urbantopia
      </footer>
    </div>
  );
}
