const quickLinks = ["Home", "How It Works", "Why Choose Us", "Courses", "Contact"];
const supportLinks = ["Help Center", "FAQs", "Privacy Policy", "Terms of Service", "Contact Us"];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
          <div className="max-w-sm">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              EduMentor<span className="text-blue-500">AI</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              Empowering students with structured learning, live classes, AI doubt solving, and progress tracking in one modern platform.
            </p>
          </div>

          <div>
            <div className="mb-5 h-7 border-l-4 border-yellow-400 pl-3">
              <h3 className="text-2xl font-semibold text-white">Quick Links</h3>
            </div>
            <div className="space-y-4 text-lg text-slate-400">
              {quickLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block transition-colors duration-200 hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 h-7 border-l-4 border-yellow-400 pl-3">
              <h3 className="text-2xl font-semibold text-white">Support</h3>
            </div>
            <div className="space-y-4 text-lg text-slate-400">
              {supportLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block transition-colors duration-200 hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="max-w-md">
            <div className="mb-5 h-7 border-l-4 border-yellow-400 pl-3">
              <h3 className="text-2xl font-semibold text-white">Stay Updated</h3>
            </div>
            <p className="text-lg leading-8 text-slate-400">
              Subscribe to stay informed about product updates, new learning features, and student success insights.
            </p>

            <form className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-base text-white outline-none transition focus:border-blue-500"
              />
              <button
                type="submit"
                className="rounded-xl bg-yellow-400 px-6 py-3 text-base font-semibold text-black transition hover:bg-yellow-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 border-t border-fuchsia-700/60 pt-6 text-center text-base text-slate-500">
          <p>
            © 2026 <span className="font-semibold text-white">EduMentorAI</span>. All rights reserved. Built for focused learning and measurable growth.
          </p>
        </div>
      </div>
    </footer>
  );
}
