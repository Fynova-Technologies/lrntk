'use client';

import { useState, useEffect } from 'react';

interface ContentItem {
  pk_id: number;
  child_title: string;
}

interface CourseContent {
  id: number;
  dropdown_title: string;
  contents: ContentItem[];
}

interface Course {
  course_id: number;
  course_title: string;
  course_contents: CourseContent[];
}

interface Sidebar {
  sidebar: Course[];
}

interface SearchResult extends ContentItem {
  course_title: string;
  dropdown_title: string;
}

export default function DocoSearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [courseData, setCourseData] = useState<Sidebar | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch course data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/sidebar.json');
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError('Failed to load course data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.length === 0) {
      setSearchResults([]);
      return;
    }

    // Check if courseData is available
    if (!courseData) {
      setSearchResults([]);
      return;
    }

    const results = courseData.sidebar.flatMap(course =>
      course.course_contents.flatMap(content =>
        content.contents
          .filter(item => item.child_title.toLowerCase().includes(term))
          .map(item => ({
            ...item,
            course_title: course.course_title,
            dropdown_title: content.dropdown_title,
          }))
      )
    );
    setSearchResults(results);
  };

  const handleClick = (title: string) => {
    alert(`You selected: ${title}`);
    // Replace with your desired action, e.g., router.push(`/course/${title}`)
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search course topics..."
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading || !!error}
      />
      {isLoading && <p className="mt-4 text-gray-600">Loading course data...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      {!isLoading && !error && searchResults.length > 0 && (
        <ul className="mt-4 space-y-2">
          {searchResults.map((result, index) => (
            <li
              key={index}
              onClick={() => handleClick(result.child_title)}
              className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
            >
              <span className="font-medium">{result.child_title}</span>
              <span className="text-sm text-gray-600">
                {' '}
                ({result.dropdown_title})
              </span>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !error && searchTerm && searchResults.length === 0 && (
        <p className="mt-4 text-gray-600">No results found.</p>
      )}
    </div>
  );
}