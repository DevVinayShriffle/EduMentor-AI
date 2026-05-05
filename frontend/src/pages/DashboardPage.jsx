import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roleContent = {
  student: {
    eyebrow: "Student Dashboard",
    title: "Stay on track with structured learning and visible progress.",
    description:
      "Review your learning plan, continue revision, solve doubts with AI, and keep your daily quiz rhythm moving.",
    cards: [
      {
        label: "Next Action",
        value: "Continue revision shorts",
        text: "Resume the current module and rewatch key concept clips before your next class."
      },
      {
        label: "Practice Rhythm",
        value: "Daily quiz pending",
        text: "Keep momentum by attempting today's AI-generated quiz and checking your score trend."
      },
      {
        label: "Dashboard Focus",
        value: "Progress analytics",
        text: "Track completion, test results, and improvement points from one role-specific home."
      }
    ]
  },
  teacher: {
    eyebrow: "Teacher Dashboard",
    title: "Manage classes, content, and student performance from one control surface.",
    description:
      "Host live sessions, upload materials, review class progress, and monitor where students need the most help.",
    cards: [
      {
        label: "Class Flow",
        value: "Upcoming live session",
        text: "Prepare your next class, then publish the replay and supporting materials for revision."
      },
      {
        label: "Content Work",
        value: "Upload notes and shorts",
        text: "Keep your course library fresh with PDFs, assignments, and topic-based revision videos."
      },
      {
        label: "Student Insight",
        value: "Performance tracking",
        text: "Use attendance and test outcomes to spot weak areas and guide students effectively."
      }
    ]
  },
  admin: {
    eyebrow: "Admin Dashboard",
    title: "Oversee the full platform with visibility across users, courses, and operations.",
    description:
      "Monitor the learning ecosystem at a system level, from user roles and content quality to performance and payments.",
    cards: [
      {
        label: "User Control",
        value: "Role oversight",
        text: "Manage students, teachers, and platform permissions through one centralized admin view."
      },
      {
        label: "Platform Quality",
        value: "Course and class monitoring",
        text: "Review learning content, class coverage, and operational consistency across the platform."
      },
      {
        label: "System Insight",
        value: "Analytics and growth",
        text: "Track active users, engagement, and revenue-related signals as the platform scales."
      }
    ]
  }
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const content = roleContent[user?.role] || roleContent.student;

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.14),_transparent_24%),linear-gradient(180deg,_#f7faff_0%,_#eef4ff_100%)] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-white/75 bg-white/88 p-6 shadow-[0_24px_70px_rgba(37,99,235,0.08)] backdrop-blur md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200/80 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
                {content.eyebrow}
              </div>
              <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
                {content.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                {content.description}
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-950 px-5 py-4 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">Logged in as</p>
              <p className="mt-3 text-lg font-semibold">{user?.email}</p>
              <p className="mt-1 text-sm capitalize text-slate-300">{user?.role}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {content.cards.map((card) => (
              <article
                key={card.label}
                className="rounded-[28px] border border-white/75 bg-white/92 p-5 shadow-[0_18px_50px_rgba(37,99,235,0.08)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">{card.label}</p>
                <h2 className="mt-4 text-xl font-semibold text-slate-950">{card.value}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{card.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Back to Landing Page
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(79,70,229,0.22)] transition hover:scale-[1.01]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
