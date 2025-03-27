"use client"
// import Sidebar from "@/components/sidebar";
// import { useState, useEffect } from 'react';
// import { Sidebar } from "@/components/ui/sidebar";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/appsidebar"
import Setup from "../introduction/page"
// import { useParams } from "next/navigation"
export default function Html(){
    // const [isToggleBarOpen, setIsOpen] = useState(false);
    // const params = useParams();
    // const course_id = Array.isArray(params.id) ? params.id[0] : params.id ?? null;
   
    return(
        <div>
            <div>
                {/* <SidebarProvider>
                <AppSidebar/> */}
                {/* set a state for dynamic id passing and send to appsidebar and set the initial id from there */}
                    <div>
                        {/* <Sidebar isOpen={true} /> */}
                        {/* <SidebarTrigger /> */}
                        <Setup />

                    </div> 
                    {/* <h1>This is the HTML Section</h1> */}
                    
                {/* </SidebarProvider> */}
                <div>
                
            </div>
            </div>
            
        </div>
    )
}