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
  

  
  interface SidebarContent {
    pk_id: number;
    child_title: string;
  }
  
  interface SidebarItem {
    id: number;
    dropdown_title: string;
    contents: SidebarContent[];
  }


export function AppSidebar() {
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

    return (
        <Sidebar className="">
            <SidebarHeader className="">
             <h2 className="text-lg font-semibold">Tutorials</h2>
            </SidebarHeader>
            <div className="w-64 z-50">
                <SearchBar courses={sideBarContents} />
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
                    <SidebarMenuSubItem>
                      <Link href={
                {
                  pathname: '/docs/html/introduction',
                  query: { pk_id: content.pk_id },
                }}
                className="block hover:bg-gray-700 rounded">{content.child_title}</Link>
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