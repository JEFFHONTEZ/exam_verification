export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0b2442' }} className="text-gray-100 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Main Footer Content - 5 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8 mb-8 sm:mb-12 border-b pb-8 sm:pb-12" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          {/* Column 1: Certified Courses */}
          <div>
            <h3 className="font-bold text-white uppercase text-xs tracking-widest mb-3 sm:mb-6 border-b pb-2 sm:pb-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>Certified Courses</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Business</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Engineering & Construction</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">English</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Health</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Information Technology (IT)</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Language</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Management</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Personal Development</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Sales & Marketing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Teaching & Academics</a></li>
            </ul>
          </div>

          {/* Column 2: About Alison */}
          <div>
            <h3 className="font-bold text-white uppercase text-xs tracking-widest mb-3 sm:mb-6 border-b pb-2 sm:pb-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>About Alison</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Our Story</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Board of Directors</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Our Team & Culture</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Our Unique HQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Open Positions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Our Course Creators</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Learning on Alison</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Press Room</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Alison in Africa</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Alison Programmes</a></li>
            </ul>
          </div>

          {/* Column 3: Quality Learning */}
          <div>
            <h3 className="font-bold text-white uppercase text-xs tracking-widest mb-3 sm:mb-6 border-b pb-2 sm:pb-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>Quality Learning</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Accreditation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">All Certificates</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">All Diplomas</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">All Free Courses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Alison Testimonials</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Graduate Profiles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Hubs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Premium Learning</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Purchase a Gift Card</a></li>
            </ul>
          </div>

          {/* Column 4: Career Resources */}
          <div>
            <h3 className="font-bold text-white uppercase text-xs tracking-widest mb-3 sm:mb-6 border-b pb-2 sm:pb-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>Career Resources</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Build Your Résumé</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Explore Job Vacancies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Alison Career Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Career Ready Plan</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Psychometric Tests</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Aptitude Test</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Well-being Test (Wellbia)</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Work Place Personality Test</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">English Proficiency Test</a></li>
            </ul>
          </div>

          {/* Column 5: Discover More */}
          <div>
            <h3 className="font-bold text-white uppercase text-xs tracking-widest mb-3 sm:mb-6 border-b pb-2 sm:pb-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>Discover More</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Access Free LMS</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Affiliate Programme</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Alison Profile</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Create Courses on Alison</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Download App & Learn Offline</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Integrate Alison's API</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Learn With Gamification</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Refer a Friend</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">TechEquity Partnership</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">UK Immigration Requirements</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Upcoming Webinars</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start md:items-center">
          {/* Left: Logo, tagline, FAQs, and social */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="https://res.cloudinary.com/dekilw4yx/image/upload/v1779646855/Alison-logo-400px_nvyecl.png" alt="Alison" className="h-6 sm:h-8 w-auto" />
              <span className="text-xs text-gray-400 leading-tight hidden sm:block">
                <div className="font-semibold">EMPOWER</div>
                <div className="font-semibold">YOURSELF</div>
              </span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm mb-6">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
                <a href="#" className="text-gray-300 hover:text-white">FAQs</a>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
                <a href="#" className="text-gray-300 hover:text-white">Customer Support</a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              <a href="#" className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="w-8 sm:w-10 h-8 sm:h-10 bg-black rounded flex items-center justify-center hover:bg-gray-800">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 002.856-3.915 9.957 9.957 0 01-2.821.856 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-700 rounded flex items-center justify-center hover:bg-blue-800">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
              <a href="#" className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded flex items-center justify-center hover:opacity-80">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.205 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
                </svg>
              </a>
              <a href="#" className="w-8 sm:w-10 h-8 sm:h-10 bg-black rounded flex items-center justify-center hover:bg-gray-800">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v19.5h3.42c.29-4.05.46-8.76.46-8.76 0-4.29 2.84-5.67 5.69-5.92.13-2.78.1-6.53.1-6.53z" />
                </svg>
              </a>
              <a href="#" className="w-8 sm:w-10 h-8 sm:h-10 bg-red-600 rounded flex items-center justify-center hover:bg-red-700">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="#" className="w-8 sm:w-10 h-8 sm:h-10 bg-red-600 rounded flex items-center justify-center hover:bg-red-700">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-2.769v-7h-1.5v-2h1.5v-1.093c0-1.623.1-2.614 2.365-2.614h1.809v2.107z" />
                </svg>
              </a>
              <a href="#" className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-500 rounded flex items-center justify-center hover:bg-blue-600">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-.412 5.884c-.031.486-.335.762-.857.762-.271 0-.52-.089-.757-.251l-3.099-2.291-1.493 1.44c-.165.164-.303.27-.621.27-.04 0-.082-.003-.122-.012l.868-12.626c.032-.486.335-.762.857-.762.271 0 .52.089.757.251l9.803 7.541c.15.115.246.275.246.475 0 .38-.309.685-.689.685-.121 0-.244-.03-.356-.09z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Middle: Ratings and badges */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-4 sm:gap-6">
            {/* Excellent Rating */}
            <div className="flex items-center gap-3">
              <div>
                <div className="text-xs sm:text-sm font-semibold text-white">Rated Excellent</div>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-green-400">⭐</span>
                  ))}
                </div>
              </div>
              <div className="text-xs text-gray-400">★ Trustpilot</div>
            </div>
          </div>

          {/* Right: App download badges */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="text-xs sm:text-sm text-gray-300 font-semibold mb-1 sm:mb-2">Download our app</div>
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              <a href="#" className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 border border-gray-500 rounded hover:bg-gray-800 text-xs sm:text-sm">
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="black" viewBox="0 0 24 24">
                  <path d="M18 6h-2.15a9 9 0 0 0-7.85-3.5A9.003 9.003 0 0 0 1 12a9.003 9.003 0 0 0 7 8.77v-5.27H5.5v-2.1h2.5V9.1c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.4 2.1h-2.4V21A9 9 0 0 0 23 12a9 9 0 0 0-5-8z" />
                </svg>
                <span>App Store</span>
              </a>
              <a href="#" className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 border border-gray-500 rounded hover:bg-gray-800 text-xs sm:text-sm">
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="black" viewBox="0 0 24 24">
                  <path d="M3 13.5h8v8.5H3z" />
                </svg>
                <span>Google Play</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Copyright and Links */}
        <div className="border-t mt-8 sm:mt-12 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div>© Alison 2026</div>
          <div className="flex gap-4 flex-wrap justify-center">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
