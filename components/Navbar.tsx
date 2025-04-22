import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggler";

// Define the props interface
interface NavbarProps {
  togglebar: () => void; 
}

const Navbar = ({ togglebar }: NavbarProps) => {
  return (
    <nav className="w-full fixed bg-gray-800 text-white top-0 left-0 h-32">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-10">
          <button
            className="md:hidden p-2 hover:bg-gray-700 rounded"
            onClick={togglebar} 
          >
            <Image
              className="md:hidden"
              src="/menu.png"
              width={70}
              height={50}
              alt="Hamburger"
            />
          </button>
          <button className="">
            <Image src={"/logo.png"} height={120} width={120} alt="logo" />
          </button>
        </div>

        <ul className="hidden md:flex space-x-4">
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
        <div>
          <ThemeToggle/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
