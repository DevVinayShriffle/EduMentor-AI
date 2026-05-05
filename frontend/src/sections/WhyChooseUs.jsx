import {
  Brain,
  Video,
  BookOpen,
  RefreshCw,
  CheckCircle,
  BarChart3
} from "lucide-react";

const features = [
  {
    text: "AI Doubt Solver",
    icon: Brain,
    desc: "Resolve text and image-based doubts with guided explanations."
  },
  {
    text: "Live + Recorded Classes",
    icon: Video,
    desc: "Move between live teaching and recorded revision without losing context."
  },
  {
    text: "Structured 1-2 Year Courses",
    icon: BookOpen,
    desc: "Stay on a planned academic path instead of fragmented topic hopping."
  },
  {
    text: "Short Revision Videos",
    icon: RefreshCw,
    desc: "Use quick topic refreshers to sharpen memory between major sessions."
  },
  {
    text: "Daily Quizzes & Tests",
    icon: CheckCircle,
    desc: "Practice consistently with AI-generated quizzes and scheduled evaluations."
  },
  {
    text: "Performance Analytics",
    icon: BarChart3,
    desc: "Track improvement with visible trends, scores, and completion signals."
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="bg-[linear-gradient(180deg,_#ffffff_0%,_#f7faff_100%)] px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200/80 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700 shadow-sm backdrop-blur">
            Why EduMentor AI
          </div>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
            A focused education system, not just another course library.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            Every layer is designed to keep students learning continuously: teaching, revision, doubt solving, assessment, and progress visibility.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="group rounded-[28px] border border-white/75 bg-white/85 p-5 text-left shadow-[0_20px_55px_rgba(37,99,235,0.07)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(37,99,235,0.12)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-900/15">
                  <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">{item.text}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
