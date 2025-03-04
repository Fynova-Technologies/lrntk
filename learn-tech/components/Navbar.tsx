import Link from "next/link";
import Image from "next/image";



const Navbar = ({tooglebar}) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className=" flex space-x-10">
          <button className="md:hidden p-2 hover:bg-gray-700 rounded" onClick={tooglebar}><Image className="md:hidden" src="/menu.png" width={70} height={50} alt="Hamburger" /></button>
          <h1 className="text-xl font-bold">Website</h1>
        </div>

        <ul className=" flex hidden md:flex   space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300 ">Home</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-300">About</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-300">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
