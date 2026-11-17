import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import ThemePreview from './pages/ThemePreview/ThemePreview';

export default function App() {
  return (
    <Suspense fallback={<div className="route-loading" role="status">Loading…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/themes/:themeId" element={<ThemePreview />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Suspense>
  );
}
