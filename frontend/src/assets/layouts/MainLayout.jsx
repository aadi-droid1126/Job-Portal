import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AppRoutes from "../routes/AppRoutes";

export default function MainLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="container">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}