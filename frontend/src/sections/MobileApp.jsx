import mobileAppImage from "../assets/images/edumentor-logo-no-bg.png";

export default function MobileApp() {
  return (
    <section
      id="app"
      className="relative overflow-hidden bg-gradient-to-br from-[#302b63] via-[#24243e] to-[#0f0c29] px-4 py-12 text-white sm:px-6 md:py-14 lg:py-16"
    >
      {/* Soft center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_58%)]" />

      {/* Decorative background lights */}
      <div className="absolute -bottom-24 left-0 h-56 w-56 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl sm:h-72 sm:w-72" />
      <div className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl sm:h-72 sm:w-72" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row md:gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <div className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-blue-100 backdrop-blur">
            Mobile Learning
          </div>

          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            EduMentor AI
            <span className="bg-gradient-to-r from-blue-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
              {" "}on the go
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-300 sm:text-base md:mx-0">
            Access courses, study materials, recorded lectures, and progress tracking anytime from your mobile.
          </p>

          {/* Download Buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30">
              Get it on Play Store
            </button>

            <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gray-700 to-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/10 transition-all duration-300 hover:scale-105 hover:shadow-pink-500/25">
              Download on App Store
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex flex-1 justify-center md:justify-end">
          <div className="relative w-52 transition-transform duration-500 hover:scale-105 sm:w-64 md:w-72 lg:w-80">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/30 via-purple-500/30 to-pink-400/30 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/95 p-3 shadow-2xl">
              <img
                src={mobileAppImage}
                alt="EduMentor AI mobile app"
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
