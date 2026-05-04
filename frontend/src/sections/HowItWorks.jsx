const steps = [
  "Enroll in Course",
  "Attend Live Classes",
  "Watch Recorded Lectures",
  "Use AI Doubt Solver",
  "Take Quizzes & Tests",
  "Track Your Progress"
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-16 text-center">
      <h2 className="text-3xl font-bold">How EduMentor AI Works</h2>

      <div className="mt-8 flex flex-col gap-4 max-w-xl mx-auto">
        {steps.map((s, i) => (
          <div key={i} className="p-3 border rounded">
            {i + 1}. {s}
          </div>
        ))}
      </div>
    </section>
  );
}