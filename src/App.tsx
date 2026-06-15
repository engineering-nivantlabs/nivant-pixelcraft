import AdminDashboard from "./pages/AdminDashboard"
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Generate from './pages/Generate';
import Gallery from './pages/Gallery';
import Pricing from './pages/Pricing';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/pricing" element={<Pricing />} />
      <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
    </Layout>
  );
}
