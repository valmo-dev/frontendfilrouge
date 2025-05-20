import { Link } from 'react-router-dom'; // Importez Link

function Sidebar() {
  return (
    <aside className="w-64 bg-white p-4 shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Navigation
      </h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link to="/" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block p-2 rounded-md font-medium">
              Accueil
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/tableau-de-bord" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block p-2 rounded-md font-medium">
              Mes voyages
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;