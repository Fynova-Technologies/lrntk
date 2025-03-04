"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Define props type
interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  // Define state type
  const [openSections, setOpenSections] = useState<{ docs: boolean }>({
    docs: true,
  });

  // Add parameter type
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside
      className={`
      fixed left-0 top-32
      h-screen bg-gray-900 text-white p-4 
      w-64 transform transition-transform duration-300 ease-in-out 
      ${
        isOpen
          ? "translate-x-0 pointer-events-auto"
          : "-translate-x-full pointer-events-none"
      } 
      md:translate-x-0 md:pointer-events-auto z-50
    `}
    >
      {/* Docs Section */}
      <div>
        <button
          className="flex justify-between w-full text-left p-2 hover:bg-gray-700 rounded"
          onClick={() => toggleSection("docs")}
        >
          <span>📖 HTML Tutorial</span>
          {openSections.docs ? (
            <ChevronDownIcon className="w-5 h-5" />
          ) : (
            <ChevronRightIcon className="w-5 h-5" />
          )}
        </button>

        {openSections.docs && (
          <ul className="ml-4 mt-2 space-y-2">
            <li>
              <Link
                href="/docs/introduction"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                HTML Introduction
              </Link>
            </li>
            <li>
              <Link
                href="/docs/basics"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                HTML Basics
              </Link>
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
