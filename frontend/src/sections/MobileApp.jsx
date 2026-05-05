import mobileAppImage from "../assets/images/mobile-app.jpg";

export default function MobileApp() {
  return (
    <section
      id="app"
      className="bg-[linear-gradient(180deg,_#f3f6ff_0%,_#eef2ff_100%)] py-20 scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.18),_transparent_28%),linear-gradient(135deg,_#0f172a_0%,_#1e1b4b_45%,_#3b0764_100%)] px-6 py-10 text-white shadow-[0_30px_90px_rgba(15,23,42,0.24)] sm:px-8 md:px-10 lg:px-12 lg:py-12">
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.10),_transparent_62%)] lg:block" />

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-100 backdrop-blur">
                Mobile Learning
              </div>

              <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                EduMentor AI
                <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
                  {" "}on the go
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-200 md:text-lg">
                Access structured courses, join live classes, revisit recorded lectures, solve doubts with AI, and keep your progress moving from anywhere.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 px-6 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(79,70,229,0.35)] transition hover:scale-[1.01]">
                  Get it on Play Store
                </button>
                <button className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/14">
                  Download on App Store
                </button>
              </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-white/12 via-blue-300/10 to-fuchsia-400/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white p-4 shadow-[0_30px_70px_rgba(15,23,42,0.35)]">
                <img
                  src={mobileAppImage}
                  alt="EduMentor AI mobile app"
                  className="h-full w-full rounded-[24px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
