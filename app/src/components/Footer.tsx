export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#0b2442" }}
      className="text-gray-100 py-8 sm:py-12"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Main Footer Content - 5 Columns */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8 mb-8 sm:mb-12 border-b pb-8 sm:pb-12"
          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          {/* Column 1: Certified Courses */}
          <div>
            <h3
              className="font-bold text-white uppercase text-xs tracking-widest mb-3 sm:mb-6 border-b pb-2 sm:pb-4"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
            >
              Certified Courses
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href="https://alison.com/courses/business"
                  className="text-gray-300 hover:text-white"
                >
                  Business
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/courses/engineering"
                  className="text-gray-300 hover:text-white"
                >
                  Engineering & Construction
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/tag/english-language"
                  className="text-gray-300 hover:text-white"
                >
                  English
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/courses/health"
                  className="text-gray-300 hover:text-white"
                >
                  Health
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/courses/it"
                  className="text-gray-300 hover:text-white"
                >
                  Information Technology (IT)
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/courses/language"
                  className="text-gray-300 hover:text-white"
                >
                  Language
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/courses/management"
                  className="text-gray-300 hover:text-white"
                >
                  Management
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/courses/personal-development"
                  className="text-gray-300 hover:text-white"
                >
                  Personal Development
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/courses/marketing"
                  className="text-gray-300 hover:text-white"
                >
                  Sales & Marketing
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/courses/education"
                  className="text-gray-300 hover:text-white"
                >
                  Teaching & Academics
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: About Alison */}
          <div>
            <h3
              className="font-bold text-white uppercase text-xs tracking-widest mb-3 sm:mb-6 border-b pb-2 sm:pb-4"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
            >
              About Alison
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href="https://alison.com/about/our-story"
                  className="text-gray-300 hover:text-white"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/about/board-of-directors"
                  className="text-gray-300 hover:text-white"
                >
                  Board of Directors
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/alison-team"
                  className="text-gray-300 hover:text-white"
                >
                  Our Team & Culture
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/hq"
                  className="text-gray-300 hover:text-white"
                >
                  Our Unique HQ
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/about/careers"
                  className="text-gray-300 hover:text-white"
                >
                  Open Positions
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/course-creators"
                  className="text-gray-300 hover:text-white"
                >
                  Our Course Creators
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/about/learning-on-alison"
                  className="text-gray-300 hover:text-white"
                >
                  Learning on Alison
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/blog"
                  className="text-gray-300 hover:text-white"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/press-room"
                  className="text-gray-300 hover:text-white"
                >
                  Press Room
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/alison-in-africa"
                  className="text-gray-300 hover:text-white"
                >
                  Alison in Africa
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/programmes"
                  className="text-gray-300 hover:text-white"
                >
                  Alison Programmes
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quality Learning */}
          <div>
            <h3
              className="font-bold text-white uppercase text-xs tracking-widest mb-3 sm:mb-6 border-b pb-2 sm:pb-4"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
            >
              Quality Learning
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href="https://alison.com/about/accreditation"
                  className="text-gray-300 hover:text-white"
                >
                  Accreditation
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/certificate-courses"
                  className="text-gray-300 hover:text-white"
                >
                  All Certificates
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/diploma-courses"
                  className="text-gray-300 hover:text-white"
                >
                  All Diplomas
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/courses"
                  className="text-gray-300 hover:text-white"
                >
                  All Free Courses
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/testimonials"
                  className="text-gray-300 hover:text-white"
                >
                  Alison Testimonials
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/alison-graduate-profiles"
                  className="text-gray-300 hover:text-white"
                >
                  Graduate Profiles
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/hubs"
                  className="text-gray-300 hover:text-white"
                >
                  Hubs
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/about/go-premium"
                  className="text-gray-300 hover:text-white"
                >
                  Premium Learning
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/alison-gift-card"
                  className="text-gray-300 hover:text-white"
                >
                  Purchase a Gift Card
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Career Resources */}
          <div>
            <h3
              className="font-bold text-white uppercase text-xs tracking-widest mb-3 sm:mb-6 border-b pb-2 sm:pb-4"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
            >
              Career Resources
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href="https://alison.com/resume-builder"
                  className="text-gray-300 hover:text-white"
                >
                  Build Your Résumé
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/recruitment"
                  className="text-gray-300 hover:text-white"
                >
                  Explore Job Vacancies
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/careers"
                  className="text-gray-300 hover:text-white"
                >
                  Alison Career Guide
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/career-ready-plan"
                  className="text-gray-300 hover:text-white"
                >
                  Career Ready Plan
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/psychometric-test"
                  className="text-gray-300 hover:text-white"
                >
                  Psychometric Tests
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/psychometric-test/aptitude"
                  className="text-gray-300 hover:text-white"
                >
                  Aptitude Test
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/psychometric-test/wellbeing"
                  className="text-gray-300 hover:text-white"
                >
                  Well-being Test (Wellbia)
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/psychometric-test/personality"
                  className="text-gray-300 hover:text-white"
                >
                  Work Place Personality Test
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/hubs/english-test"
                  className="text-gray-300 hover:text-white"
                >
                  English Proficiency Test
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Discover More */}
          <div>
            <h3
              className="font-bold text-white uppercase text-xs tracking-widest mb-3 sm:mb-6 border-b pb-2 sm:pb-4"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
            >
              Discover More
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <a
                  href="https://alison.com/lms"
                  className="text-gray-300 hover:text-white"
                >
                  Access Free LMS
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/affiliates/learn-to-earn"
                  className="text-gray-300 hover:text-white"
                >
                  Affiliate Programme
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/public-profile"
                  className="text-gray-300 hover:text-white"
                >
                  Alison Profile
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/publish"
                  className="text-gray-300 hover:text-white"
                >
                  Create Courses on Alison
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/mobile/online-learning-app"
                  className="text-gray-300 hover:text-white"
                >
                  Download App & Learn Offline
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/lms/lms-remote-access-api"
                  className="text-gray-300 hover:text-white"
                >
                  Integrate Alison's API
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/learn-with-gamification"
                  className="text-gray-300 hover:text-white"
                >
                  Learn With Gamification
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/referrals-programme/about"
                  className="text-gray-300 hover:text-white"
                >
                  Refer a Friend
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/tech-equity"
                  className="text-gray-300 hover:text-white"
                >
                  TechEquity Partnership
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/uk-english-a-level"
                  className="text-gray-300 hover:text-white"
                >
                  UK Immigration Requirements
                </a>
              </li>
              <li>
                <a
                  href="https://alison.com/webinars"
                  className="text-gray-300 hover:text-white"
                >
                  Upcoming Webinars
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start md:items-center">
          {/* Left: Logo, tagline, FAQs, and social */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="https://res.cloudinary.com/dekilw4yx/image/upload/v1779646855/Alison-logo-400px_nvyecl.png"
                alt="Alison"
                className="h-6 sm:h-8 w-auto"
              />
              <span className="text-xs text-gray-400 leading-tight hidden sm:block">
                <div className="font-semibold">EMPOWER</div>
                <div className="font-semibold">YOURSELF</div>
              </span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm mb-6">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
                <a href="#" className="text-gray-300 hover:text-white">
                  FAQs
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
                <a href="#" className="text-gray-300 hover:text-white">
                  Customer Support
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {/* Facebook */}
              <a
                href="#"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-[#1877F2] rounded flex items-center justify-center hover:bg-[#166FE5]"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="#"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-black rounded flex items-center justify-center hover:bg-gray-900"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-[#0077B5] rounded flex items-center justify-center hover:bg-[#006294]"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded flex items-center justify-center hover:opacity-90"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.205 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="#"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-black rounded flex items-center justify-center hover:bg-gray-900"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.05 1.51 4.25 1.12.7 2.43 1.02 3.73 1.05v3.94c-1.42-.03-2.81-.46-4-1.24v6.86c.06 4.07-3.04 7.69-7.11 7.82-4.43.3-8.29-3.25-8.15-7.67.12-3.76 3.26-6.91 7.03-7.04.13 0 .27 0 .4.01v4.02c-.14-.02-.28-.03-.42-.03-2.16-.03-4.04 1.64-4.2 3.79-.24 2.48 1.9 4.6 4.39 4.36 2.05-.1 3.69-1.78 3.71-3.84v-11.5c.01-1.5-.02-3-.01-4.5z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-[#FF0000] rounded flex items-center justify-center hover:bg-[#E60000]"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Quora */}
              <a
                href="#"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-[#B92B27] rounded flex items-center justify-center hover:bg-[#A1211E]"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .027c-6.19 0-11.208 4.793-11.208 10.704 0 5.91 5.018 10.704 11.208 10.704.814 0 1.61-.082 2.378-.239.539.553 1.157 1.251 2.052 1.802 1.545.952 3.197.943 3.197.943a.138.138 0 0 0 .121-.077.147.147 0 0 0-.012-.14c-.173-.254-.937-1.391-1.285-2.656 2.164-1.748 3.541-4.401 3.541-7.337C23.208 4.82 18.19.027 12 .027zm1.252 14.331c-.34.331-.861.474-1.507.474-1.077 0-1.832-.511-2.228-1.51-.315-.8-.328-2.146-.037-2.955.362-1.01 1.096-1.54 2.195-1.54.551 0 1.037.14 1.391.439.428.361.64.954.64 1.776 0 .913-.162 1.579-.454 2.316zm1.758.825c.346-.714.542-1.636.542-2.738 0-1.218-.326-2.144-.972-2.753-.668-.627-1.625-.945-2.846-.945-1.764 0-2.969.756-3.606 2.268-.458 1.082-.486 2.836-.073 3.993.593 1.666 1.83 2.454 3.666 2.454.49 0 .949-.051 1.385-.152.126.175.293.424.494.743.344.542.663.856.663.856s.08.064.175.021a.152.152 0 0 0 .092-.128c.032-.387-.043-1.365-.173-2.071 1.03-.923 1.621-2.274 1.653-3.848z" />
                </svg>
              </a>

              {/* Telegram */}
              <a
                href="#"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-[#229ED9] rounded flex items-center justify-center hover:bg-[#208FA7]"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.18l-1.92 9.06c-.14.64-.52.8-.11.56l-2.92-2.15-1.41 1.36c-.16.16-.29.29-.6.29l.21-2.99 5.44-4.92c.24-.21-.05-.33-.37-.12l-6.73 4.24-2.9-1c-.63-.2-1.33-.2-.59-.51l11.29-4.36c.52-.19 1.02.14.82.99z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Middle: Ratings and badges */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-4 sm:gap-6">
            {/* Excellent Rating */}
            <div className="flex items-center gap-3">
              <div>
                <div className="text-xs sm:text-sm font-semibold text-white">
                  Rated Excellent
                </div>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-green-400">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-xs text-gray-400">★ Trustpilot</div>
            </div>
          </div>

          {/* Right: App download badges */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="text-xs sm:text-sm text-gray-300 font-semibold mb-1 sm:mb-2">
              Download our app
            </div>
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {/* Apple App Store */}
              <a
                href="#"
                className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 border border-gray-500 rounded hover:bg-gray-800 text-xs sm:text-sm text-white"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-1.01 2.96 1.07.08 2.18-.54 2.84-1.35z" />
                </svg>
                <span>App Store</span>
              </a>

              {/* Google Play Store */}
              <a
                href="#"
                className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 border border-gray-500 rounded hover:bg-gray-800 text-xs sm:text-sm text-white"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3.609 1.814L13.783 12 3.609 22.186c-.183.183-.314.419-.383.674l12.491-12.49 3.824 2.208c1.06.612 1.06 2.212 0 2.824l-3.824 2.208L3.226 22.86c.214.39.623.64 1.096.64.316 0 .618-.11.872-.314l14.453-8.34c1.611-.93 1.611-3.252 0-4.182L5.197 2.332a1.737 1.737 0 00-.872-.314c-.473 0-.882.25-1.096.64l.38-.844zM3.52 2.48l11.026 11.025-2.28 2.28L3.52 2.48z" />
                </svg>
                <span>Google Play</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Copyright and Links */}
        <div
          className="border-t mt-8 sm:mt-12 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4"
          style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <div>© Alison 2026</div>
          <div className="flex gap-4 flex-wrap justify-center">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Cookie Policy
            </a>
            <a href="#" className="hover:text-white">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
