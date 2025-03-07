"use client"
import Sidebar from "@/components/sidebar";
// import { useState, useEffect } from 'react';


export default function Html(){
    // const [isToggleBarOpen, setIsOpen] = useState(false);

    
    
    return(
        <div>
            <div>
        <Sidebar isOpen={true} />

        </div> 
            <h1>This is the HTML Section</h1>
        </div>
    )
}