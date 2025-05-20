import React, { useState } from 'react';
import useVoyageStore from '../stores/useVoyageStore';
import ActivityModal from '../components/ActivityModal'; 

function VoyagePage() {
  const currentVoyage = useVoyageStore((state) => state.currentVoyage);
  const isLoading = useVoyageStore((state) => state.isLoading);
  const error = useVoyageStore((state) => state.error);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [currentCarouselImageIndex, setCurrentCarouselImageIndex] = useState(0);

  const handleOpenActivityModal = () => {
    setIsActivityModalOpen(true);
  };

  const handleCloseActivityModal = () => {
    setIsActivityModalOpen(false);
  };

  const handleCreateActivity = (activityData) => {
    console.log("Nouvelle activité à créer:", activityData);
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Chargement du voyage...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Erreur: {error}</p>;
  }

  if (!currentVoyage) {
    return <p className="text-center text-gray-700">Aucun voyage sélectionné. Retournez à l'accueil pour en charger un.</p>;
  }

  const { name, destination, dates, description, budget, participants, activities, hebergements, images, mapImage } = currentVoyage;

  const nextImage = () => {
    setCurrentCarouselImageIndex((prevIndex) => (prevIndex + 1) % (images?.length || 1));
  };

  const prevImage = () => {
    setCurrentCarouselImageIndex((prevIndex) => (prevIndex - 1 + (images?.length || 1)) % (images?.length || 1));
  };

  // JSX principal retourné par le composant
  return (
    <div>
      {/* Fil d'Ariane et Titre */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">Voyages &gt; {name}</p>
        <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
        <p className="text-md text-gray-600">{destination} - {dates}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      {/* Grille pour les différentes sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carte et Activités */}
        <div className="lg:col-span-1 space-y-6">
          {/* Carte */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Localisation</h2>
            <div className="bg-gray-200 h-48 flex items-center justify-center rounded">
              {mapImage ? (
                <img src={mapImage} alt={`Carte de ${destination}`} className="object-cover h-full w-full rounded" />
              ) : (
                <p className="text-gray-500">Carte non disponible</p>
              )}
            </div>
          </div>

          {/* Activités */}
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-700">Activités</h2>
            </div>
            {activities?.length > 0 ? (
              activities.map(activity => (
                <div key={activity.id} className="border border-green-300 bg-green-50 p-3 rounded-md mb-3 flex items-start justify-between">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-green-700">{activity.name}</h3>
                    <p className="text-xs text-gray-500">{activity.lieu} | {activity.dateDebut}</p>
                    {activity.description && <p className="text-xs text-gray-600 mt-1">{activity.description}</p>}
                    <p className="text-lg font-bold text-green-600 mt-1">{activity.prix}€</p>
                  </div>
                  {activity.image && <img src={activity.image} alt={activity.name} className="rounded h-16 w-16 object-cover ml-2 flex-shrink-0" />}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Aucune activité planifiée.</p>
            )}
            <button
              onClick={handleOpenActivityModal}
              className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center"
            >
              Ajouter une activité
            </button>
          </div>
        </div>

        {/* Hébergements et Diagramme */}
        <div className="lg:col-span-1 space-y-6">
          {/* Hébergements */}
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-700">Hébergements</h2>
            </div>
            {hebergements?.length > 0 ? (
              hebergements.map(hebergement => (
                <div key={hebergement.id} className="border border-purple-300 bg-purple-50 p-3 rounded-md mb-3 flex items-start justify-between">
                  <div className="flex-grow">
                    <h3 className="font-semibold text-purple-700">{hebergement.name}</h3>
                    <p className="text-xs text-gray-500">{hebergement.lieu}</p>
                    <p className="text-xs text-gray-500">{hebergement.date_debut} - {hebergement.date_fin}</p>
                    {hebergement.description && <p className="text-xs text-gray-600 mt-1">{hebergement.description}</p>}
                    <p className="text-lg font-bold text-purple-600 mt-1">{hebergement.prix}€</p>
                  </div>
                  {hebergement.image && <img src={hebergement.image} alt={hebergement.name} className="rounded h-16 w-16 object-cover ml-2 flex-shrink-0" />}
                  {/* <span className="text-purple-500 text-2xl self-center">&gt;</span> */}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Aucun hébergement planifié.</p>
            )}
            <button className="w-full mt-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center">
              {/* Icone FaPlus */} Ajouter un hébergement
            </button>
          </div>

          {/* Diagramme Budget */}
          {budget && (
            <div className="bg-white p-4 shadow rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-gray-700">Répartition du Budget</h2>
                {/* Icone FaEuroSign */}
              </div>
              <p className="text-sm text-gray-600">Total Dépensé: <span className="font-semibold">{budget.spent}{budget.currency}</span></p>
              <p className="text-sm text-gray-600">Budget max: <span className="font-semibold">{budget.total}{budget.currency}</span></p>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div 
                  className="bg-blue-500 h-4 rounded-full" 
                  style={{ width: `${(budget.spent / budget.total) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-center text-gray-500">
                (Diagramme circulaire WIP)
              </div>
            </div>
          )}
        </div>

        {/* Carrousel et Participants */}
        <div className="lg:col-span-1 space-y-6">
          {/* Carrousel d'images */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
             <h2 className="text-xl font-semibold text-gray-700 p-4 pb-0">Photos du voyage</h2>
            {images?.length > 0 ? (
              <div className="bg-gray-800 h-64 flex items-center justify-center relative">
                <img src={images[currentCarouselImageIndex]} alt={`Image ${currentCarouselImageIndex + 1} du voyage`} className="object-cover w-full h-full" />
                {images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full text-gray-700">&lt;</button>
                    <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full text-gray-700">&gt;</button>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-gray-200 h-64 flex items-center justify-center p-4">
                <p className="text-gray-500">Aucune photo pour ce voyage.</p>
              </div>
            )}
          </div>

          {/* Participants et dettes */}
          {participants && (
            <div className="bg-white p-4 shadow rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-gray-700">Participants</h2>
                {/* Icone FaUsers */}
              </div>
              <div className="space-y-2 text-sm">
                {participants.map(participant => (
                  <p key={participant.id}>
                    {participant.name}
                    {Object.entries(participant.owes).map(([owesTo, amount]) => (
                      <span key={owesTo} className="text-red-500 text-xs ml-1">(⚠ Doit {amount}€ à {owesTo})</span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ActivityModal
        isOpen={isActivityModalOpen}
        onClose={handleCloseActivityModal}
        onSubmit={handleCreateActivity}
      />
    </div>
  );
}

export default VoyagePage;