import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TouristPlaces from "./pages/TouristPlaces";
import PlaceDetail from "./pages/PlaceDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SubmitPlace from "./pages/SubmitPlace";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)] font-body text-[var(--color-text)]">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/places" element={<TouristPlaces />} />
          <Route path="/places/:id" element={<PlaceDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/submit"
            element={
              <ProtectedRoute>
                <SubmitPlace />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
