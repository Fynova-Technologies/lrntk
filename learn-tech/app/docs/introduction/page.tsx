// import Link from 'next/link';
import React from 'react';
import {Highlight, themes} from 'prism-react-renderer';
import Image from 'next/image';

export default function Introduction() {
  const code = `
    <!DOCTYPE html>
      <html>
        <head>
            <title>My HTML JOURNEY</title>
        </head>
        <body>
            <h1>Hello World</h1>
            <p>A Sample of The website to learn HTML</p>
        </body>
      </html>
    `;
  return (
    <div className="html-intro">
      <h1 className="text-4xl font-bold mb-4">HTML Introduction</h1>
      <div className="m-10 p-4 items-center justify-center border-y-1 border-neutral-600">
        <p className="">HTML (HyperText Markup Language) is the standard language used to create and design web pages. It provides the structure of a webpage using tags and elements.</p>
        <p className="">Without HTML, web browsers wouldn&apos;t know how to display content properly. HTML organizes text, images, links, and other elements on a webpage.</p>
        <p>A web browser (like Chrome, Firefox, or Edge) reads an HTML file and displays it as a webpage.
          HTML uses tags to define different parts of the content (like headings, paragraphs, images, and links).
          The basic structure of an HTML document looks like this:</p>
      </div> 
      <div className="w-full m-10">
      <Highlight theme={themes.dracula} code={code} language="html">
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
    <div>
      <h1>Breaking Down the Code:</h1>
      <div className='m-10 grid-cols-2'>
        <div>
          <ul className='m-10 list-disc  px-4 py-2 text-xl marker:text-green-500 '>
            <li>!DOCTYPE html → Tells the browser that this is an HTML5 document.</li>
            <li>html → The main container for the webpage.</li>
            <li>head → Contains important information like the page title (not visible on the page).</li>
            <li>title → Sets the title that appears on the browser tab.</li>
            <li>body → Contains the actual content of the page.</li>
            <li>h1 → A heading (bigger text to highlight important information).</li>
            <li>p → A paragraph (used for writing normal text).</li>
          </ul>
        </div>
        <div>
          
        </div>
      </div>
    </div>

    <div>
      <h2>This is How your Html looks like in a webpage</h2>
      <div className=' m-10'>
        <Image  src={"/Screenshot.png"} width={500} height={500} alt={"Demo"}/>
      </div>
    </div>

    </div>
    


  );
}
