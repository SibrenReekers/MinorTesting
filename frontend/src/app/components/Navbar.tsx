// components/Navbar.js
import Link from 'next/link';
import NavLinks from '../utils/nav-links';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg w-full static top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link 
        href="/"
        className="text-white font-semibold text-2xl"
        >My Website
        </Link>
        <div className="flex items-center space-x-4">
          <NavLinks />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;