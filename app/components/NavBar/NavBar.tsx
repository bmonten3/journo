import { useState } from 'react';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow bg-gray-900">
      <div className="container w-screen px-6 py-3 mx-auto md:flex justify-between">
        {/* Mobile menu button */}
        <div className="flex lg:hidden ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="bg-gray-900 text-gray-200 hover:text-gray-400 focus:outline-none"
            aria-label="toggle menu"
          >
            {!isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8h16M4 16h16"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 bg-gray-900 transition-all duration-300 ease-in-out ${
            isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'
          } md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center`}
        >
          <div className="flex flex-col md:flex-row md:items-center">
            <a
              href="#"
              className="text-gray-200 hover:bg-gray-800 px-3 py-2 rounded-md"
            >
              Journal
            </a>
            <a
              href="#"
              className="text-gray-200 hover:bg-gray-800 px-3 py-2 rounded-md"
            >
              Insights
            </a>
            <a
              href="#"
              className="text-gray-200 hover:bg-gray-800 px-3 py-2 rounded-md"
            >
              AI Suggestions
            </a>
          </div>

          {/* Search bar */}
          <div className="mt-4 md:mt-0 md:ml-auto">
            <div className="relative">
              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 border rounded-lg bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-400 focus:ring-blue-300"
                placeholder="Search entries..."
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
