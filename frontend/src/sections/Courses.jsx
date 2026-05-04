const courses = [
  { title: "JEE 2-Year Plan", desc: "Complete structured engineering prep" },
  { title: "NEET 2-Year Plan", desc: "Medical entrance preparation" },
  { title: "Foundation Course", desc: "Class 9–10 strong base building" }
];

export default function Courses() {
  return (
    <section id="courses" className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold">Our Courses</h2>

      <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
        {courses.map((c, i) => (
          <div key={i} className="p-6 bg-white rounded shadow">
            <h3 className="font-bold text-xl">{c.title}</h3>
            <p className="text-gray-600 mt-2">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}