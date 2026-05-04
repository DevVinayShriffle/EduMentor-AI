export default function Navbar() {
  return (
    <header className="w-full shadow-sm bg-white z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          EduMentor AI
        </h1>

        {/* Menu */}
        <nav className="hidden md:flex gap-6 font-medium">
          <a href="#courses">Courses</a>
          <a href="#why">Why Us</a>
          <a href="#how">How It Works</a>
          <a href="#app">Mobile App</a>
        </nav>

        {/* Language + Login */}
        <div className="flex items-center gap-3">
          <select className="border p-1 rounded">
            <option>EN</option>
            <option>HI</option>
          </select>

          <button className="bg-blue-600 text-white px-4 py-1 rounded">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}