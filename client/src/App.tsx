import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import HomePage from './pages/home';
import WelcomePage from './pages/wellcome';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

