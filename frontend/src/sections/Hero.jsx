export default function Hero() {
  return (
    <section className="pt-28 text-center px-4 bg-gradient-to-r from-blue-50 to-white">
      <h1 className="text-4xl md:text-6xl font-bold">
        Learn Smarter with <span className="text-blue-600">EduMentor AI</span>
      </h1>

      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        AI-powered structured learning for 1-year & 2-year courses with live classes, recorded lectures, quizzes, and doubt solving.
      </p>

      <div className="mt-6 flex justify-center gap-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Get Started
        </button>
        <button className="border px-6 py-2 rounded">
          Explore Courses
        </button>
      </div>
    </section>
  );
}