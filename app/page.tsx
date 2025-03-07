"use client"
import { useState, useEffect } from "react";

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
      {contents.map((content,index)=>(
        <div key={index} className="flex flex-col border-2 w-full rounded-2xl items-center justify-center p-4 bg-emerald-900 hover:transition-colors hover:duration-00 hover:ease-in-out transform hover:scale-105" >
          <h1 className="font-white text-2xl">{content.card_Title}</h1>
          <a href={"/docs/html"}><button className="p-4 bg-blue-950 rounded-2xl">Start Tutorial</button></a>
      </div>
      ))}
      



      
    </div>
  );
}
