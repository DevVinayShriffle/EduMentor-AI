export default function MobileApp() {
  return (
    <section id="app" className="py-16 text-center bg-blue-50">
      <h2 className="text-3xl font-bold">EduMentor AI on the Go</h2>

      <p className="mt-2 text-gray-600">
        Learn anywhere, anytime with our mobile app.
      </p>

      <div className="flex justify-center gap-4 mt-6">
        <button className="bg-black text-white px-4 py-2 rounded">
          Get it on Play Store
        </button>
        <button className="bg-black text-white px-4 py-2 rounded">
          Download on App Store
        </button>
      </div>
    </section>
  );
}