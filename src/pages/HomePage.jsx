import React from 'react';
import { useNavigate } from 'react-router-dom';
import useVoyageStore from '../stores/useVoyageStore';

function HomePage() {
    const navigate = useNavigate();
    const loadItalianVoyage = useVoyageStore((state) => state.loadItalianVoyage);

    const handleLoadItalyTrip = () => {
        loadItalianVoyage();
        navigate('/tableau-de-bord');
    }
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Bienvenue sur CEFIM Voyage !</h1>
      <p className="text-gray-700">
        Page d'accueil <span className='font-bold text-xl'>[ WIP ]</span>
      </p>
      <button
        onClick={handleLoadItalyTrip}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Voyage : Italie
      </button>
    </div>
  );
}

export default HomePage;