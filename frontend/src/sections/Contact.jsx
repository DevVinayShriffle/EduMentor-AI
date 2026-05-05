import logoImage from "../assets/images/edumentor-logo-no-bg.png";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fbff_50%,_#eef5ff_100%)] px-4 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-200/80 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 shadow-sm backdrop-blur">
              <img src={logoImage} alt="EduMentor AI logo" className="mr-2 h-5 w-auto" />
              Contact Us
            </div>

            <h2 className="mt-6 max-w-2xl text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Let’s talk about better digital learning experiences.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
              Reach out for demos, partnerships, onboarding questions, or implementation discussions around EduMentor AI.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="rounded-[24px] border border-white/75 bg-white/88 px-5 py-5 shadow-[0_18px_50px_rgba(37,99,235,0.08)] backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">Email</p>
                <p className="mt-3 text-base font-semibold text-slate-950">hello@edumentorai.com</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/75 bg-white/92 p-6 shadow-[0_24px_60px_rgba(37,99,235,0.08)] backdrop-blur md:p-8">
            <form className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your name"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white"
              />

              <textarea
                rows="6"
                placeholder="Tell us what you’d like to discuss"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white"
              />

              <button
                type="submit"
                className="inline-flex justify-center rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(79,70,229,0.22)] transition hover:scale-[1.01]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
