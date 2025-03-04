import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  toggleBar: () => void; // Explicitly define the function type
}

const Navbar: React.FC<NavbarProps> = ({ toggleBar }) => {
  return (
    <nav className="w-full fixed bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex space-x-10 items-center">
          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-700 rounded"
            onClick={toggleBar}
          >
            <Image src="/menu.png" width={40} height={40} alt="Hamburger" />
          </button>

          {/* Logo */}
          <Link href="/">
            <Image src="/logo.png" height={80} width={80} alt="Logo" />
          </Link>
        </div>

        {/* Navigation Links (Hidden on Mobile) */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
