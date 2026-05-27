"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");

  const doSearch = (q?: string) => {
    const term = (q ?? query).trim();
    if (!term) return;
    const url = `https://alison.com/courses?query=${encodeURIComponent(term)}`;
    window.location.href = url;
  };
  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Mobile View */}
        <div className="md:hidden flex items-center justify-between h-16">
          {/* Left: search + menu */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Search"
              className="p-2 rounded-md hover:bg-gray-100"
              type="button"
              onClick={() => {
                const q = window.prompt("Search Alison for:");
                if (q && q.trim()) doSearch(q);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <button
              aria-label="Open menu"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Center: logo */}
          <Link href="https://alison.com" className="flex-1 flex justify-center">
            <img
              src="https://res.cloudinary.com/dekilw4yx/image/upload/v1779646855/Alison-logo-500px_uaahmd.png"
              alt="Alison"
              className="h-8 w-auto"
            />
          </Link>

          {/* Right: dollar icon + login */}
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-semibold">
              $
            </button>
            <a href="https://alison.com/login" className="text-sm text-gray-700 hover:text-blue-600">
              Log In
            </a>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between h-16 gap-4">
          {/* Left: logo */}
          <Link href="https://alison.com" className="flex items-center gap-1 flex-shrink-0">
            <img
              src="https://res.cloudinary.com/dekilw4yx/image/upload/v1779646855/Alison-logo-400px_nvyecl.png"
              alt="Alison"
              className="h-8 w-auto"
            />
            <span className="text-xs text-gray-600 leading-tight hidden lg:block">
              <div className="font-semibold">EMPOWER</div>
              <div className="font-semibold">YOURSELF</div>
            </span>
          </Link>

          {/* Middle: Explore dropdown and search */}
          <div className="flex items-center gap-4 flex-1">
            <div className="relative">
              <button className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                Explore
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 relative max-w-md">
              <input
                aria-label="Search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") doSearch();
                }}
                className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="What do you want to learn?"
              />
              <button
                type="button"
                onClick={() => doSearch()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
              LMS
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white text-sm font-semibold">
              $
            </button>
            <a href="https://alison.com/login" className="text-sm text-gray-700 hover:text-blue-600">
              Log In
            </a>
            <a href="https://alison.com/register" className="px-4 py-1.5 bg-emerald-600 text-white rounded text-sm font-medium hover:bg-emerald-700">
              Sign Up
              </a>
            <button className="flex items-center gap-1 text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-50">
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
