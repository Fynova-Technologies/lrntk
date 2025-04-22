"use client"
// import Sidebar from "@/components/sidebar";
// import { useState, useEffect } from 'react';
// import { Sidebar } from "@/components/ui/sidebar";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/appsidebar"
import Setup from "../../introduction/page"
// import { useParams } from "next/navigation"
export default function Html(){
    // const [isToggleBarOpen, setIsOpen] = useState(false);
    // const params = useParams();
    // const course_id = Array.isArray(params.id) ? params.id[0] : params.id ?? null;
   
    return(
        <div className="flex flex-row w-full">
            
                        <Setup />

                    
            
        </div>
    )
}