import mobileAppImage from "../assets/images/mobile-app.jpg";

export default function MobileApp() {
  return (
    <section
      id="app"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.16),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(244,114,182,0.14),_transparent_28%),linear-gradient(135deg,_#111827_0%,_#1e1b4b_48%,_#312e81_100%)] py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-100 backdrop-blur">
              Mobile Learning
            </div>

            <h2 className="mt-8 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              EduMentor AI
              <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
                {" "}on the go
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 md:text-lg">
              Access structured courses, upload learning materials, revisit recorded lectures, and track your progress anytime from a mobile experience built for serious study.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 px-7 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(79,70,229,0.35)] transition hover:scale-[1.01]">
                Get it on Play Store
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-white/12 bg-slate-900/70 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-slate-900/85">
                Download on App Store
              </button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 rounded-[44px] bg-gradient-to-br from-white/10 via-blue-300/10 to-fuchsia-400/12 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/95 p-5 shadow-[0_30px_70px_rgba(15,23,42,0.35)]">
              <img
                src={mobileAppImage}
                alt="EduMentor AI mobile app"
                className="h-full w-full rounded-[24px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
