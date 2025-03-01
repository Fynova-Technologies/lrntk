"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({ docs: true });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed p-4">
      <h2 className="text-xl font-bold mb-4">Docs Sidebar</h2>

      {/* Docs Section */}
      <div>
        <button
          className="flex justify-between w-full text-left p-2 hover:bg-gray-700 rounded"
          onClick={() => toggleSection("docs")}
        >
          <span>📖 Documentation</span>
          {openSections.docs ? (
            <ChevronDownIcon className="w-5 h-5" />
          ) : (
            <ChevronRightIcon className="w-5 h-5" />
          )}
        </button>

        {openSections.docs && (
          <ul className="ml-4 mt-2 space-y-2">
            <li>
              <Link href="/docs/introduction" className="block p-2 hover:bg-gray-700 rounded">
                📜 Introduction
              </Link>
            </li>
            <li>
              <Link href="/docs/setup" className="block p-2 hover:bg-gray-700 rounded">
                🛠 Setup Guide
              </Link>
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
