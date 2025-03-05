'use client'
// import Link from 'next/link';
import React from 'react';
import {Highlight, themes} from 'prism-react-renderer';
import Image from 'next/image';
import { useState, useEffect } from "react";


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
  id: number;
  title: string;
  children: Child[];
}

interface ApiResponse {
  sections: Section[];
}

export default function Setup() {

  const [content, setContent] = useState<Section | null>(null);

  useEffect(() => {
    fetch("/html_intro.json")
      .then((response) => response.json())
      .then((data:ApiResponse) => {
        const foundSection = data.sections.find((sec:Section) => sec.id === 1);
        setContent(foundSection || null)
      }
    )
      .catch((error) => console.error("Error fetching content:", error));
  }, []);

  if (!content) {
    return <p>Loading...</p>;
  }


  return (
    <div className="html-intro">
      <h1 className="text-4xl font-bold">{content.title}</h1>
      <hr className="my-4 border-gray-700" />

      {/* Render Sections Dynamically */}
      {content.children.map((section, index) => {
        switch (section.type) {
          case "text":
            return <p key={index} className="mb-10 p-10 text-lg">{section.content}</p>;

          case "code":
            return (
              <div key={index} className='p-10'>
              <Highlight theme={themes.dracula} code={section.content||""} language="html">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div style={{ width: "90%", overflowX: "auto" }}>
          <pre
            className={className}
            style={{
              ...style,
              minWidth: "100%",
              padding: "10px",
              borderRadius: "8px",
              display: "block",
              whiteSpace:"pre-wrap",
              overflowX: "auto", // Enables horizontal scrolling
              // wordWrap: "normal", // Prevents text wrapping
              background: "#282a36", // Dracula theme background color
            }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line }); // Get line props
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token }); // Get token props
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

          case "list":
            return (
              <div key={index}>
                <h2 className="text-2xl font-bold">{section.title}</h2>
                <ul className="mt-4 p-10 text-lg">
                  {section.items?.map((item, idx) => (
                    <li key={idx} className="text-green-400">• {item}</li>
                  ))}
                </ul>
              </div>
            );

          case "example":
            return (
              <h1 key={index}>{section.text}</h1>
          );

          case "image":
            return (
              <Image key={index} src={section.url || ""} height={500} width={500} alt={section.alt||""} className="mt-4  rounded-lg m-10 " />
            );

          default:
            return null;
        }
      })}

    </div>
  );
}
