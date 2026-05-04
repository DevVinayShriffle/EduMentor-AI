import { useState, useEffect } from "react";

const courses = [
  {
    title: "JEE 2-Year Plan",
    desc: "Complete structured engineering prep",
    price: "₹19,999",
    tag: "New",
    image: "https://images.unsplash.com/photo-1581091870620-4c4b7b1b7f2a"
  },
  {
    title: "NEET 2-Year Plan",
    desc: "Medical entrance preparation",
    price: "₹18,499",
    tag: "Old",
    image: "https://images.unsplash.com/photo-1581090700227-4c4c1f0a7c77"
  },
  {
    title: "Foundation Course",
    desc: "Class 9–10 strong base building",
    price: "₹9,999",
    tag: "New",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644"
  },
  {
    title: "Foundation Course",
    desc: "Class 9–10 strong base building",
    price: "₹9,999",
    tag: "New",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644"
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
    <section id="courses" className="py-16 px-4 text-center">

      {/* Heading */}
      <h2
        className="text-2xl md:text-4xl font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        Our Courses
      </h2>

      <p
        className="text-sm mt-2"
        style={{ color: "var(--text-secondary)" }}
      >
        Structured learning paths designed for real results.
      </p>

      {/* Slider */}
      <div className="mt-10 max-w-6xl mx-auto overflow-hidden">

        {/* Track */}
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

              <div
                className="group rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(11,11,13,0.06)",
                  backdropFilter: "blur(10px)",
                }}
              >

                {/* Image */}
                <div className="h-40 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4 text-left">

                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {c.title}
                  </h3>

                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {c.desc}
                  </p>

                  <div className="flex justify-between items-center mt-4">

                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {c.price}
                    </span>

                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background:
                          c.tag === "New"
                            ? "rgba(34,197,94,0.12)"
                            : "rgba(59,130,246,0.12)",
                        color:
                          c.tag === "New"
                            ? "#16a34a"
                            : "#2563eb",
                      }}
                    >
                      {c.tag}
                    </span>

                  </div>

                  <button
                    className="mt-4 w-full py-2 text-sm rounded-md"
                    style={{
                      background:
                        "linear-gradient(90deg, #3b82f6, #6366f1)",
                      color: "white",
                    }}
                  >
                    View Details
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}