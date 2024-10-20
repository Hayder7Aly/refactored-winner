import { Link, useLocation } from '@tanstack/react-router';

const Navbar = () => {
  const location = useLocation(); // Get the current route

  return (
    <nav className="bg-gray-800 mb-8">
      <div className="w-full mx-auto px-4 py-2 flex items-center justify-between">
        <Link className="text-white text-lg font-bold cursor-pointer" to="/">Cafe's Management</Link>
        <div className="flex space-x-4">
          <Link
            to="/cafes"
            className={`text-white py-2 px-4 rounded-md text-sm font-medium transition duration-200 ${
              location.pathname === '/cafes' ? 'bg-gray-700' : 'hover:bg-gray-900'
            }`}
          >
            Cafes
          </Link>
          <Link
            to="/employees"
            className={`text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
              location.pathname === '/employees' ? 'bg-gray-700' : 'hover:bg-gray-900'
            }`}
          >
            Employees
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
