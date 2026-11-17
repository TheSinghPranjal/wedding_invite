import { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import ThemePreview from './pages/ThemePreview/ThemePreview';

/** Scroll to the #hash target (or top) on navigation. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const t = setTimeout(() => {
      if (hash) document.querySelector(hash)?.scrollIntoView();
      else window.scrollTo(0, 0);
    }, 60);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
    <ScrollManager />
    <Suspense fallback={<div className="route-loading" role="status">Loading…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/themes/:themeId" element={<ThemePreview />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Suspense>
    </>
  );
}
