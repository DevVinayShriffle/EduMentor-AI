export default function DashboardHome({ user, homeContent }) {
  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/75 bg-white/88 p-6 shadow-[0_24px_70px_rgba(37,99,235,0.08)] backdrop-blur md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-200/80 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
              {homeContent.eyebrow}
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
              {homeContent.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              {homeContent.description}
            </p>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-950 px-5 py-4 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
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
            className="rounded-[28px] border border-white/75 bg-white/92 p-5 shadow-[0_18px_50px_rgba(37,99,235,0.08)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
              {card.label}
            </p>
            <h2 className="mt-4 text-xl font-semibold text-slate-950">{card.value}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{card.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
