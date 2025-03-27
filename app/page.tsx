"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import Link from "next/link";

interface CardContent{
  id:number,
  card_Title:string

}


export default function Home() {
  const [contents, setContents] = useState<CardContent[]>([])

  useEffect(()=>{
    fetch("/home.json")
    .then((response)=>response.json())
    .then((data)=>{setContents(data.card)})
    .catch((error)=>console.error("Error Fetching contents", error));
  },[])

  return (
    <div className="grid grid-cols-4 p-24 gap-10">
      {contents.map((content, index) => (
      <div key={index}>
        <Card className="border-4 justify-center items-center">
        <CardContent className="grid gap-4">
        <div>
          
            <div
              key={index}
              className="mb-4 grid items-start pb-4 last:mb-0 last:pb-0"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {content.card_Title}
                </p> 
              </div>
              <CardFooter>
              <Link href={`/docs/course/${content.id}`}>
                <Button  className="cursor-pointer">
                  Start Tutorial
                </Button>
              </Link>
              </CardFooter>
            </div>
          
        </div>
      </CardContent>
     
    </Card>
    </div>
    ))}

    </div>
  );
}
