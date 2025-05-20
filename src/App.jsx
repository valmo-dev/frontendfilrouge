// import { useState } from 'react' // Plus besoin pour l'état global géré par Zustand
import Sidebar from './components/Sidebar';
import VoyagePage from './pages/VoyagePage';
import HomePage from './pages/HomePage'; // Importez HomePage
import { Routes, Route } from 'react-router-dom'; // Importez Routes et Route

function App() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-500 p-4 text-white shadow-md">
        <p className="text-xl font-semibold">CEFIM Voyage</p>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
          <Routes> {/* Définissez vos routes ici */}
            <Route path="/" element={<HomePage />} />
            <Route path="/tableau-de-bord" element={<VoyagePage />} />
            {/* Vous pourrez ajouter d'autres routes ici plus tard */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
