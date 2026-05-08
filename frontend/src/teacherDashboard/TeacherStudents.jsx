import { useOutletContext } from "react-router-dom";

export default function TeacherStudents() {
  const { isDarkTheme } = useOutletContext();
  const stats = [
    { label: "Total Students", value: "428" },
    { label: "Active This Week", value: "371" },
    { label: "Low Attendance", value: "26" },
    { label: "Pending Doubts", value: "18" },
  ];
  const students = [
    { name: "Aarav Sharma", course: "Class 12 Physics", progress: "82%", attendance: "91%", lastActive: "2 hours ago", status: "On track" },
    { name: "Diya Kapoor", course: "NEET Chemistry", progress: "67%", attendance: "74%", lastActive: "Yesterday", status: "Needs follow-up" },
    { name: "Reyansh Gupta", course: "JEE Foundation Maths", progress: "88%", attendance: "96%", lastActive: "45 mins ago", status: "Excellent" },
    { name: "Ishita Nair", course: "Class 11 Science", progress: "59%", attendance: "69%", lastActive: "3 days ago", status: "At risk" },
  ];
  const cardClass = isDarkTheme ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(17,24,39,0.9))] text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]" : "border-white/75 bg-white/92 text-slate-900 shadow-[0_20px_60px_rgba(37,99,235,0.08)]";
  const mutedClass = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const accentClass = isDarkTheme ? "text-fuchsia-300" : "text-blue-700";

  return (
    <div className="space-y-6">
      <section className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Students</p>
        <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Track cohort health, engagement, and intervention needs.</h1>
            <p className={`mt-3 max-w-3xl text-sm leading-7 md:text-base ${mutedClass}`}>Monitor the students who are active, identify low-attendance risk early, and keep a quick path to doubt support and progress review.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input type="text" placeholder="Search by student name" className={`rounded-2xl border px-4 py-3 text-sm outline-none ${isDarkTheme ? "border-white/10 bg-white/5 text-white placeholder:text-slate-400" : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"}`} />
            <select className={`rounded-2xl border px-4 py-3 text-sm outline-none ${isDarkTheme ? "border-white/10 bg-white/5 text-white" : "border-slate-200 bg-white text-slate-900"}`} defaultValue="All Courses">
              <option>All Courses</option>
              <option>Class 12 Physics</option>
              <option>NEET Chemistry</option>
              <option>JEE Foundation Maths</option>
            </select>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article key={item.label} className={`rounded-[28px] border p-5 ${cardClass}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>{item.label}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">{item.value}</h2>
          </article>
        ))}
      </section>

      <section className={`rounded-[28px] border p-5 ${cardClass}`}>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className={mutedClass}>
                <th className="pb-3 pr-4 font-semibold">Name</th>
                <th className="pb-3 pr-4 font-semibold">Course</th>
                <th className="pb-3 pr-4 font-semibold">Progress</th>
                <th className="pb-3 pr-4 font-semibold">Attendance</th>
                <th className="pb-3 pr-4 font-semibold">Last Active</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.name} className={`border-t ${isDarkTheme ? "border-white/10" : "border-slate-200/80"}`}>
                  <td className="py-4 pr-4 font-semibold">{student.name}</td>
                  <td className={`py-4 pr-4 ${mutedClass}`}>{student.course}</td>
                  <td className="py-4 pr-4">{student.progress}</td>
                  <td className="py-4 pr-4">{student.attendance}</td>
                  <td className={`py-4 pr-4 ${mutedClass}`}>{student.lastActive}</td>
                  <td className="py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isDarkTheme ? "bg-fuchsia-500/12 text-fuchsia-200" : "bg-indigo-100 text-indigo-700"}`}>{student.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
