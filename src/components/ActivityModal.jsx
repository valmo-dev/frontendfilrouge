import React, { useState, useEffect } from 'react';

// Idéalement, utilisez une bibliothèque d'icônes comme react-icons
// import { FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaEdit } from 'react-icons/fa';

function ActivityModal({ isOpen, onClose, onSubmit }) {
  const [nom, setNom] = useState('');
  const [lieu, setLieu] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [prix, setPrix] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [currentParticipant, setCurrentParticipant] = useState('');

  // Réinitialiser le formulaire quand le modal est fermé puis rouvert
  useEffect(() => {
    if (isOpen) {
      setNom('');
      setLieu('');
      setDateDebut('');
      setDateFin('');
      setPrix('');
      setDescription('');
      setImagePreview(null);
      setParticipants([]);
      setCurrentParticipant('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      // Ici, vous stockeriez le fichier lui-même pour l'envoyer au backend
      // setActivityImage(e.target.files[0]);
    }
  };

  const handleAddParticipant = () => {
    if (currentParticipant.trim() !== '' && !participants.includes(currentParticipant.trim())) {
      setParticipants([...participants, currentParticipant.trim()]);
      setCurrentParticipant('');
    }
  };

  const handleRemoveParticipant = (participantToRemove) => {
    setParticipants(participants.filter(p => p !== participantToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activityData = {
      nom,
      lieu,
      dateDebut,
      dateFin,
      prix,
      description,
      // image: activityImage, // Le fichier image réel
      participants,
    };
    onSubmit(activityData);
    onClose(); // Fermer le modal après soumission
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Nouvelle Activité</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            {/* <FaTimes /> */} &times; {/* Placeholder pour l'icône de fermeture */}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colonne de gauche: Champs de texte */}
            <div className="space-y-4">
              <div>
                <label htmlFor="activity-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'activité
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="activity-name"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  {/* Icône optionnelle d'édition (comme sur l'image) */}
                  {/* <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><FaEdit /></span> */}
                </div>
              </div>

              <div>
                <label htmlFor="activity-location" className="block text-sm font-medium text-gray-700 mb-1">
                  Lieu / Adresse
                </label>
                <div className="relative">
                  {/* <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FaMapMarkerAlt /></span> */}
                  <input
                    type="text"
                    id="activity-location"
                    value={lieu}
                    onChange={(e) => setLieu(e.target.value)}
                    className="w-full p-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  {/* <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><FaEdit /></span> */}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="activity-start-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date de début
                  </label>
                  <input
                    type="date"
                    id="activity-start-date"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="activity-end-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    id="activity-end-date"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="activity-price" className="block text-sm font-medium text-gray-700 mb-1">
                  Prix (€)
                </label>
                <input
                  type="number"
                  id="activity-price"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: 50"
                />
              </div>

              <div>
                <label htmlFor="activity-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optionnel)
                </label>
                <textarea
                  id="activity-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>

            {/* Colonne de droite: Image et Participants */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image de l'activité</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Aperçu" className="mx-auto h-32 w-auto rounded" />
                    ) : (
                      // Placeholder pour l'icône d'image
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="activity-image-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Télécharger un fichier</span>
                        <input id="activity-image-upload" name="activity-image-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                      </label>
                      <p className="pl-1">ou glisser-déposer</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="activity-participant" className="block text-sm font-medium text-gray-700 mb-1">
                  Ajouter un participant
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="activity-participant"
                    value={currentParticipant}
                    onChange={(e) => setCurrentParticipant(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nom du participant"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddParticipant())}
                  />
                  <button
                    type="button"
                    onClick={handleAddParticipant}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                  >
                    Ajouter
                  </button>
                </div>
                {participants.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {participants.map((p, index) => (
                      <span key={index} className="bg-purple-100 text-purple-700 text-sm font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        {p}
                        <button
                          type="button"
                          onClick={() => handleRemoveParticipant(p)}
                          className="ml-1.5 text-purple-500 hover:text-purple-700"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pied de page du modal avec les boutons */}
          <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Enregistrer l'activité
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivityModal;