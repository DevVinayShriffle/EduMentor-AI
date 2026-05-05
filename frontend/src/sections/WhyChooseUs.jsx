import {
  Brain,
  Video,
  BookOpen,
  RefreshCw,
  CheckCircle,
  BarChart3
} from "lucide-react";

const features = [
  { text: "AI Doubt Solver", icon: Brain },
  { text: "Live + Recorded Classes", icon: Video },
  { text: "Structured 1-2 Year Courses", icon: BookOpen },
  { text: "Short Revision Videos", icon: RefreshCw },
  { text: "Daily Quizzes & Tests", icon: CheckCircle },
  { text: "Performance Analytics", icon: BarChart3 }
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="scroll-mt-24 py-16 px-4 max-w-6xl mx-auto text-center">

      {/* Heading */}
      <h2
        className="text-2xl md:text-4xl font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        Why Choose{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #3b82f6, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          EduMentor AI
        </span>
        ?
      </h2>

      {/* Subtext */}
      <p
        className="mt-2 text-xs md:text-base max-w-xl mx-auto"
        style={{ color: "var(--text-secondary)" }}
      >
        Smart learning tools designed for better focus and results.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mt-8">

        {features.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="
                group
                p-3 md:p-4
                rounded-lg
                transition-all duration-300 ease-out
                hover:-translate-y-1
                hover:shadow-md
                hover:border-blue-200
                cursor-pointer
              "
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(11,11,13,0.06)",
                backdropFilter: "blur(10px)",
              }}
            >

              {/* Icon */}
              <div className="flex justify-center mb-2">
                <Icon
                  size={18}
                  className="transition-transform duration-300 group-hover:scale-110"
                  style={{ color: "var(--accent-primary)" }}
                />
              </div>

              {/* Text */}
              <p
                className="text-xs md:text-sm font-medium leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {item.text}
              </p>

            </div>
          );
        })}
      </div>
    </section>
  );
}
