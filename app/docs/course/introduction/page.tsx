'use client';

import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import Image from 'next/image';
import { Suspense, useState, useEffect } from 'react';
// import { useRouter } from 'next/compat/router';
// import Sidebar from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/appsidebar"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';



interface Child {
  type: string;
  content?: string;
  language?: string;
  title?: string;
  items?: string[];
  url?: string;
  alt?: string;
  text?: string;
}

interface Section {
  fk_id: number;
  title: string;
  children: Child[];
}

interface ApiResponse {
  sections: Section[];
}

interface NavigationProps {
  currentId: number;
  content: ApiResponse; // Define the type for content
}



function Navigation({ currentId , content }:  NavigationProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const index = content.sections.findIndex((content) => content.fk_id === currentId);
    if (index !== -1) {
      setCurrentIndex(index); // Set the current index
    }
  }, [currentId,content.sections]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < content.sections.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };


return(
  <div className='flex justify-between w-full gap-4'>
      {/* Previous Button */}
      {currentIndex > 0 && (
    <Link
    href={
    {
      pathname: '/docs/html/introduction',
      query: { pk_id: content.sections[currentIndex-1].fk_id },
    }}
    className="block hover:bg-gray-700 rounded"
  >    
    <Button
      onClick={handlePrevious}
      className="px-4 py-2 cursor-pointer"
    >
      Previous
    </Button>
    </Link>
  )}

{currentIndex < content.sections.length && (
  <Link
  href={
  {
    pathname: '/docs/html/introduction',
    query: { pk_id: content.sections[currentIndex+1].fk_id },
  }}
  className="block hover:bg-gray-700 rounded"
>    
    <Button
      onClick={handleNext}
      className="cursor-pointer"
    >
      Next
    </Button>
    </Link>
  )}
  </div>
)
}


function IntroductionPage({  pkId }: { courseid:string|null, pkId: string | null;  setPkId: (pkId: string | null) => void}) {
  const params = useParams();
  const course_Name = params.Title;
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = (codeString: string | undefined) => {
    if (codeString) {
      navigator.clipboard.writeText(codeString);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };
  
  const [content, setContent] = useState<Section | null>(null);
  const [sectioncontent, setSecContent] = useState<ApiResponse>({ sections: [] }); // Initialize with default value
  console.log("introduction psetPkIdage running: ", course_Name)
  useEffect(() => {
    // if (router && !router.isReady) {
    //   return;
    // }
    
      console.log('COurse name is :', course_Name);
      if(course_Name==="HTML-Tutorials"){
      fetch('/html_intro.json')
        .then((response) => response.json())
        .then((data: ApiResponse) => {
          const foundSection = data.sections.find((sec: Section) => sec.fk_id === parseInt(pkId as string));
          setSecContent(data);
          setContent(foundSection || null);
        })
        .catch((error) => console.error('Error fetching content:', error));}
        else if(course_Name==="Dart-Tutorial"){
          fetch('/dart.json')
        .then((response) => response.json())
        .then((data: ApiResponse) => {
          const foundSection = data.sections.find((sec: Section) => sec.fk_id === parseInt(pkId as string));
          setSecContent(data);
          setContent(foundSection || null);
        })
        .catch((error) => console.error('Error fetching content:', error));
        }else if(course_Name==="React-Tutorials"){
          fetch('/react.json')
        .then((response) => response.json())
        .then((data: ApiResponse) => {
          const foundSection = data.sections.find((sec: Section) => sec.fk_id === parseInt(pkId as string));
          setSecContent(data);
          setContent(foundSection || null);
        })
        .catch((error) => console.error('Error fetching content:', error));
        }else if(course_Name==="SQL-Tutorials"){
          fetch('/sql.json')
        .then((response) => response.json())
        .then((data: ApiResponse) => {
          const foundSection = data.sections.find((sec: Section) => sec.fk_id === parseInt(pkId as string));
          setSecContent(data);
          setContent(foundSection || null);
        })
        .catch((error) => console.error('Error fetching content:', error));
        }
    
  }, [pkId,course_Name]);

  if (!content) {
    return <p>Loading...</p>;
  }
  
  

  return (
    <div className="html-intro">
      <div>
                
                    <div>

                        <div>
      <h1 className="text-4xl font-bold">{content.title}</h1>
      <hr className="my-4 border-gray-700" />

      <Suspense fallback={<div>Loading...</div>}>
        {content.children.map((section, index) => {
          switch (section.type) {
            case 'text':
              return (
                <p key={index} className="mb-10 p-10 text-lg">
                  {section.content}
                </p>
              );

            case 'code':
              return (
                <div key={index} className="p-10">
                  
                  <Highlight theme={themes.dracula} code={section.content || ''} language="Html">
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <div style={{ width: '90%', overflowX: 'auto' }}>
                        
                        <pre
                          className={className}
                          style={{
                            ...style,
                            minWidth: '100%',
                            padding: '10px',
                            borderRadius: '8px',
                            display: 'block',
                            whiteSpace: 'pre-wrap',
                            overflowX: 'auto',
                            background: '#282a36',
                          }}
                        >
                          <div className='flex flex-col float-right'>
                            <button onClick={()=>copyToClipboard(section.content)} className="p-2 cursor-pointer bg-black text-amber-50 float-right rounded-2xl">Copy</button>
                            {isCopied && <div className="text-amber-50 float-right rounded-2xl">Code copied!</div>}
                          </div>
                          
                          {tokens.map((line, i) => {
                            const lineProps = getLineProps({ line });
                            return (
                              <div key={i} {...lineProps}>
                                {line.map((token, key) => {
                                  const tokenProps = getTokenProps({ token });
                                  return <span key={key} {...tokenProps} />;
                                })}
                              </div>
                            );
                          })}
                        </pre>
                      </div>
                    )}
                  </Highlight>
                </div>
              );

            case 'list':
              return (
                <div key={index}>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                  <ul className="mt-4 p-10 text-lg">
                    {section.items?.map((item, idx) => (
                      <li key={idx} className="text-green-400">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );

            case 'example':
              return <h1 key={index}>{section.text}</h1>;

            case 'image':
              return (
                <Image
                  key={index}
                  src={section.url || ''}
                  height={500}
                  width={500}
                  alt={section.alt || ''}
                  className="mt-4 rounded-lg m-10"
                />
              );

            default:
              return null;
          }
        })}
      </Suspense>
      </div>
      <div>
        <Navigation currentId={content.fk_id} content={sectioncontent}/>
      </div>

                    </div> 
                {/* </SidebarProvider> */}
      </div>
      
    </div>
  );
}

export default function Setup() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id ?? null; // Ensure id is a string or null
  const [pkId, setPkId] = useState<string | null>(null);

  // Get the ID from the URL


  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* {pkId !== null && <IntroductionPage courseid={id} pkId={pkId} setPkId={setPkId} />} */}
      {/* <IntroductionPage pkId={id} /> */}
      <SidebarProvider>
      <AppSidebar id={id ?? ''} setPkid={setPkId} />
      <SidebarTrigger className='p-2 right-0'/>
      <IntroductionPage courseid={id} pkId={pkId} setPkId={setPkId} />
      </SidebarProvider>
    </Suspense>
  );
}