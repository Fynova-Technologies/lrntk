'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    // SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,SidebarMenuSubItem
  } from "@/components/ui/sidebar"
import SearchBar from "./Search";

import { Settings, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Collapsible,CollapsibleTrigger, CollapsibleContent } from "./ui/collapsible"   
import Link from "next/link"
  
interface SidebarSection {
  course_id: number;
  course_contents: SidebarItem[]; // Define the correct type for course_contents
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


export function AppSidebar({ id, setPkid }: { id: string; setPkid: (pkid: string) => void }) {
    const [sideBarContents,setSideBarContents] = useState<SidebarItem[]>([])
    console.log("Side bar id is")
    console.log(id)
      
useEffect(() => {
  if (id) {
    fetch("/sidebar.json")
      .then((response) => response.json())
      .then((data: { sidebar: SidebarSection[] }) => {
        const foundSection = data.sidebar.find(
          (section) => section.course_id === parseInt(id as string)
        );
        if (foundSection) {
          setSideBarContents(foundSection.course_contents);
          setPkid(foundSection.course_contents?.[0]?.contents?.[0]?.pk_id?.toString() ?? "");
        }
        console.log(foundSection);
      })
      .catch((error) => console.error("Error Fetching contents", error));
  }
}, [id, setPkid]);
    
    

      if (!sideBarContents) {
        return <p>Loading...</p>;
      }

    return (
        <Sidebar className="pt-32 border-none">
            <SidebarHeader className="">
             <h2 className="text-lg font-semibold">Tutorials</h2>
            </SidebarHeader>
            <div className="w-68 z-50">
                <SearchBar courses={sideBarContents} setPkid={setPkid} />
            </div>
            <SidebarContent>
            <SidebarMenu className="">
        {sideBarContents.map(sidebar =>
        <div key={sidebar.id}> 
        
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem className="flex flex-col">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="flex justify-between items-center w-full p-2 hover:bg-gray-700 rounded">
                    <span>{sidebar.dropdown_title}</span>
                    <ChevronDown className="w-5 h-5 transition-transform group-open/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
  
                {sidebar.contents.map(content=>
                <div key={content.pk_id}>
                    <CollapsibleContent className="pl-4">
                  <SidebarMenuSub>
                    <SidebarMenuSubItem onClick={()=>setPkid(content.pk_id.toString())}>
                      {/* <Link href={`/docs/course/${content.pk_id}`}
                className="block hover:bg-secondary-foreground hover:text-primary-foreground  rounded p-1">{content.child_title}</Link> */}
                <button className="p-0 cursor-pointer" onClick={()=>setPkid(content.pk_id.toString())} >{content.child_title}</button>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
                </div>
                )}
                
              </SidebarMenuItem>
            </Collapsible>
        </div>
    )}
    </SidebarMenu>
        </SidebarContent>
  
        <SidebarFooter>
          <SidebarMenuItem>
            <Link href="/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </SidebarMenuItem>
        </SidebarFooter>
  
      </Sidebar>
    )
  }