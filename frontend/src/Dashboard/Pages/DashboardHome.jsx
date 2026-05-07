export default function DashboardHome({ user, homeContent, isDarkTheme = false }) {
  return (
    <div className="space-y-6">
      <section
        className={`rounded-[32px] border p-6 backdrop-blur md:p-8 ${
          isDarkTheme
            ? "border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.72),rgba(30,41,59,0.66))] shadow-[0_30px_80px_rgba(2,6,23,0.38)]"
            : "border-white/75 bg-white/88 shadow-[0_24px_70px_rgba(37,99,235,0.08)]"
        }`}
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div
              className={`inline-flex items-center rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] ${
                isDarkTheme
                  ? "border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-200"
                  : "border-blue-200/80 bg-blue-50 text-blue-700"
              }`}
            >
              {homeContent.eyebrow}
            </div>
            <h1
              className={`mt-5 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl ${
                isDarkTheme ? "text-white" : "text-slate-950"
              }`}
            >
              {homeContent.title}
            </h1>
            <p
              className={`mt-4 max-w-2xl text-base leading-8 md:text-lg ${
                isDarkTheme ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {homeContent.description}
            </p>
          </div>

          <div
            className={`rounded-[24px] border px-5 py-4 text-white ${
              isDarkTheme
                ? "border-white/10 bg-[linear-gradient(135deg,rgba(79,70,229,0.28),rgba(15,23,42,0.92))] shadow-[0_20px_50px_rgba(2,6,23,0.35)]"
                : "border-slate-200 bg-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.16)]"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                isDarkTheme ? "text-fuchsia-200" : "text-blue-200"
              }`}
            >
              Logged in as
            </p>
            <p className="mt-3 text-lg font-semibold">{user?.email}</p>
            <p className="mt-1 text-sm capitalize text-slate-300">{user?.role}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {homeContent.cards.map((card) => (
          <article
            key={card.label}
            className={`rounded-[28px] border p-5 ${
              isDarkTheme
                ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(17,24,39,0.84))] shadow-[0_20px_50px_rgba(2,6,23,0.32)]"
                : "border-white/75 bg-white/92 shadow-[0_18px_50px_rgba(37,99,235,0.08)]"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-[0.24em] ${
                isDarkTheme ? "text-fuchsia-300" : "text-blue-700"
              }`}
            >
              {card.label}
            </p>
            <h2
              className={`mt-4 text-xl font-semibold ${
                isDarkTheme ? "text-white" : "text-slate-950"
              }`}
            >
              {card.value}
            </h2>
            <p
              className={`mt-3 text-sm leading-7 ${
                isDarkTheme ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {card.text}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
