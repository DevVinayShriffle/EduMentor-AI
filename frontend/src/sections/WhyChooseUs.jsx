const features = [
  "AI Doubt Solver",
  "Live + Recorded Classes",
  "Structured 1-2 Year Courses",
  "Short Revision Videos",
  "Daily Quizzes & Tests",
  "Performance Analytics"
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-16 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold">Why Choose EduMentor AI?</h2>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {features.map((item, i) => (
          <div key={i} className="p-4 border rounded shadow-sm">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}