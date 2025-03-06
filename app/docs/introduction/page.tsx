'use client';

import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import Image from 'next/image';
import { Suspense, useState, useEffect } from 'react';
import { useRouter } from 'next/compat/router';
import { useSearchParams } from 'next/navigation';

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

// Move Search into a separate component wrapped with Suspense
function SearchComponent({ onPkIdFetched }: { onPkIdFetched: (pkId: string | null) => void }) {
  const searchParams = useSearchParams();
  const pk_id = searchParams.get('pk_id');
  useEffect(() => {
    onPkIdFetched(pk_id);
  }, [pk_id, onPkIdFetched]);
  return null; // This component doesn't render anything
}

function IntroductionPage({ pkId }: { pkId: string | null }) {
  const router = useRouter();
  const [content, setContent] = useState<Section | null>(null);

  useEffect(() => {
    if (router && !router.isReady) {
      return;
    }
    if (pkId) {
      fetch('/html_intro.json')
        .then((response) => response.json())
        .then((data: ApiResponse) => {
          const foundSection = data.sections.find((sec: Section) => sec.fk_id === parseInt(pkId as string));
          setContent(foundSection || null);
        })
        .catch((error) => console.error('Error fetching content:', error));
    }
  }, [router, pkId]);

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <div className="html-intro">
      <h1 className="text-4xl font-bold">{content.title}</h1>
      <hr className="my-4 border-gray-700" />

      {/* Render Sections Dynamically */}
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
                  <Highlight theme={themes.dracula} code={section.content || ''} language="html">
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
  );
}

export default function Setup() {
  const [pkId, setPkId] = useState<string | null>(null);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchComponent onPkIdFetched={setPkId} />
      {pkId !== null && <IntroductionPage pkId={pkId} />}
    </Suspense>
  );
}