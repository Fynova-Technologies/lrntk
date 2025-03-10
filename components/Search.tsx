"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


interface SidebarContent {
  pk_id: number;
  child_title: string;
}

interface SidebarItem {
  id: number;
  dropdown_title: string;
  contents: SidebarContent[];
}

interface SearchBarProps {
  courses: SidebarItem[];
}

const SearchBar: React.FC<SearchBarProps> =  ({courses})=>{
    const [SearchIsOpen,setSearchOpen] = useState(false)
    const [query,setQuery] = useState("")
    const [filteredCourses, setFilteredCourses] = useState<SidebarContent[]>([]); // Corrected line
    const router = useRouter();


    
    function handleOnClick(){
        setSearchOpen(!SearchIsOpen)
    }

    useEffect(() => {
        if (query.trim() === "") {
          setFilteredCourses([]);
          return;
        }
    
        const results = courses
          .flatMap((course) => course.contents)
          .filter((content) =>
            content.child_title.toLowerCase().includes(query.toLowerCase())
          );
    
        setFilteredCourses(results);
      }, [query,courses]);
    
      const handleSelectCourse = (pk_id:number) => {
        router.push(`/docs/html/introduction?pk_id=${pk_id}`);
      };

    return(

        <div className="w-full">
            <div className="flex items-center">
                <input onChange={(e)=>{setQuery(e.target.value)}} type="text"
                    placeholder="Search courses..."
                    value={query} className={`mr-3 p-2 border-2 w-[150px]
                    border-t-amber-50 rounded-2xl ${SearchIsOpen?"flex":"hidden"}`} >
                </input>
                <div className="overflow-y-auto ">
                  {filteredCourses.length > 0 && (
                    <ul className="absolute left-0 w-full max-h-44 m-10 bg-blue-600 border-gray-300 rounded-xl mt-1 shadow-lg overflow-y-scroll">
                      {filteredCourses.map((course) => (
                        <li
                          key={course.pk_id}
                          onClick={() => handleSelectCourse(course.pk_id)}
                          className="p-4 overflow-auto cursor-pointer hover:bg-gray-200"
                        >
                          {course.child_title}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
                <Image src={"/loupe.png"} onClick={handleOnClick}
                     height={800} width={900} alt="Search"  className="bg-emerald-400 hover:bg-blue-300 hover:cursor-pointer p-2 rounded-3xl h-10 w-10"/>
            </div>
        </div>

    )
}

export default SearchBar;