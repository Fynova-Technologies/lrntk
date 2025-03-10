"use client"

import Image from "next/image";
import { useState } from "react";


const SearchBar = ()=>{
    const [SearchIsOpen,setSearchOpen] = useState(false)
    
    function handleOnClick(){
        setSearchOpen(!SearchIsOpen)
    }

    return(

        <div className="w-full">
            <div className="flex items-center">
                <input className={`mr-3 p-2 border-2 w-[150px] border-t-amber-50 rounded-2xl ${SearchIsOpen?"flex":"hidden"}`} ></input>
                <Image src={"/loupe.png"} onClick={handleOnClick} height={800} width={900} alt="Search"  className="bg-emerald-400 hover:bg-blue-300 hover:cursor-pointer p-2 rounded-3xl h-10 w-10"/>
            </div>
        </div>

    )
}

export default SearchBar;