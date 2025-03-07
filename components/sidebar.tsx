"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// Define props type
interface SidebarProps {
  isOpen: boolean;
}

interface SidebarContent {
  pk_id: number;
  child_title: string;
}

interface SidebarItem {
  id: number;
  dropdown_title: string;
  contents: SidebarContent[];
}



const Sidebar = ({ isOpen }: SidebarProps) => {
  // Define state type
  const [openSections, setOpenSections] = useState<{ [docs:string]: boolean }>({
    // docs: true,
  });

  const [sideBarContents,setSideBarContents] = useState<SidebarItem[]>([])

  useEffect (()=>{
    fetch("/sidebar.json")
      .then((response)=>response.json())
      .then((data)=>{
        setSideBarContents(data.sidebar)
    })

    .catch((error)=>console.error("Error Fetching contents", error));

  },[]);

  if (!sideBarContents) {
    return <p>Loading...</p>;
  }

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
      overflow-x-auto
    `}
    >
      {/* Docs Section */}
      <div className="mb-32">
        {sideBarContents.map((sidebar,index)=>(
          <div key={index}>
          <button
          key={index}
          className="flex justify-between w-full text-left p-2 hover:bg-gray-700 rounded"
          onClick={() => toggleSection(sidebar.dropdown_title)}
        >
          <span>📖 {sidebar.dropdown_title}</span>
          {openSections[sidebar.dropdown_title] ? (
            <ChevronDownIcon className="w-5 h-5" />
          ) : (
            <ChevronRightIcon className="w-5 h-5" />
          )}
        </button>

        {openSections[sidebar.dropdown_title] && sidebar.contents &&(
          <ul className="ml-4 mt-2 space-y-2">
            {sidebar.contents.map((content,index)=>(
              <li key={index}>
              <Link
                href={
                {
                  pathname: '/docs/html/introduction',
                  query: { pk_id: content.pk_id },
                }}
                className="block hover:bg-gray-700 rounded"
              >
                {content.child_title}
              </Link>
            </li>
            ))}
          </ul>
        )}
        </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
