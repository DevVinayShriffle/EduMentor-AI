import { useState, useEffect } from "react";

const courses = [
  {
    title: "JEE 2-Year Plan",
    desc: "Structured engineering prep with live classes, revision flow, and weekly testing.",
    price: "₹19,999",
    tag: "Flagship",
    image: "https://images.unsplash.com/photo-1581091870620-4c4b7b1b7f2a"
  },
  {
    title: "NEET 2-Year Plan",
    desc: "Medical entrance preparation designed for consistent long-term performance.",
    price: "₹18,499",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1581090700227-4c4c1f0a7c77"
  },
  {
    title: "Foundation Course",
    desc: "Strong base-building for Class 9–10 with concept-first teaching and revision.",
    price: "₹9,999",
    tag: "Early Prep",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644"
  },
  {
    title: "Teacher-Led Crash Track",
    desc: "Fast-paced revision path with recorded replays, tests, and AI-backed practice.",
    price: "₹7,499",
    tag: "Revision",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7"
  },
];

export default function Courses() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % courses.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="courses" className="bg-[linear-gradient(180deg,_#eef4ff_0%,_#ffffff_100%)] px-4 py-20 text-center">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200/80 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 shadow-sm backdrop-blur">
            Structured Programs
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Courses built for long-term outcomes, not content overload.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            Explore learning plans designed around timelines, revision cycles, performance checkpoints, and real academic progression.
          </p>
        </div>

        <div className="mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${index * (100 / 3)}%)`,
              width: `${courses.length * (100 / 3)}%`,
            }}
          >
            {courses.map((c, i) => (
              <div
                key={i}
                className="px-3"
                style={{
                  flex: "0 0 33.3333%"
                }}
              >
                <div className="group overflow-hidden rounded-[28px] border border-white/75 bg-white/90 text-left shadow-[0_24px_60px_rgba(37,99,235,0.08)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(37,99,235,0.14)]">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  </div>

                  <div className="p-4 text-left">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-slate-950">
                        {c.title}
                      </h3>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {c.tag}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {c.desc}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-base font-semibold text-slate-950">
                        {c.price}
                      </span>
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Premium Track
                      </span>
                    </div>
                    <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(79,70,229,0.22)]">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
