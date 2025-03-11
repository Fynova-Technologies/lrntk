"use client"
// import Sidebar from "@/components/sidebar";
// import { useState, useEffect } from 'react';
// import { Sidebar } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/appsidebar"

export default function Html(){
    // const [isToggleBarOpen, setIsOpen] = useState(false);

    
    
    return(
        <div>
            <div>
                <SidebarProvider>
                <AppSidebar />
                    <div>
                        {/* <Sidebar isOpen={true} /> */}
                        <SidebarTrigger />

                    </div> 
                </SidebarProvider>
            </div>
            <div>
                <h1>This is the HTML Section</h1>
            </div>
        </div>
    )
}