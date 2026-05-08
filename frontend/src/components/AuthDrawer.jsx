import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const initialLoginState = {
  email: "",
  password: "",
};

const initialSignupState = {
  email: "",
  phone_number: "",
  password: "",
  password_confirmation: "",
  role: "student",
};

export default function AuthDrawer({ isOpen, mode, onClose, onModeChange, onSuccess }) {
  const { login, signup, isLoading } = useAuth();
  const [loginForm, setLoginForm] = useState(initialLoginState);
  const [signupForm, setSignupForm] = useState(initialSignupState);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setErrorMessage("");
  }, [mode, isOpen]);

  const handleLoginChange = (field, value) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignupChange = (field, value) => {
    setSignupForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      let nextUser;

      if (mode === "login") {
        nextUser = await login(loginForm);
      } else {
        nextUser = await signup(signupForm);
      }

      setLoginForm(initialLoginState);
      setSignupForm(initialSignupState);
      onSuccess(nextUser);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[140] transition-all duration-300 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-slate-950/22 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-xl transform border-l border-white/15 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.18),_transparent_22%),linear-gradient(180deg,_rgba(15,23,42,0.96)_0%,_rgba(30,41,59,0.98)_100%)] p-6 text-white shadow-[0_20px_80px_rgba(15,23,42,0.35)] transition-transform duration-300 sm:w-[34rem] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-100">
                {mode === "login" ? "Welcome Back" : "Create Account"}
              </div>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white">
                {mode === "login" ? "Login to EduMentor AI" : "Start your learning journey"}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">
                {mode === "login"
                  ? "Access your dashboard, continue learning, and pick up right where you left off."
                  : "Join as a student or teacher and enter a premium AI-powered academic ecosystem."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/16"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-1 flex-col">
            <div className="space-y-4">
              {mode === "signup" && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">You are a</span>
                  <select
                    value={signupForm.role}
                    onChange={(event) => handleSignupChange("role", event.target.value)}
                    className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400 focus:bg-white/12"
                  >
                    <option value="student" className="text-slate-900">Student</option>
                    <option value="teacher" className="text-slate-900">Teacher</option>
                  </select>
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
                <input
                  type="email"
                  value={mode === "login" ? loginForm.email : signupForm.email}
                  onChange={(event) =>
                    mode === "login"
                      ? handleLoginChange("email", event.target.value)
                      : handleSignupChange("email", event.target.value)
                  }
                  className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white/12"
                  placeholder="Enter your email"
                  required
                />
              </label>

              {mode === "signup" && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">Phone Number</span>
                  <input
                    type="tel"
                    value={signupForm.phone_number}
                    onChange={(event) => handleSignupChange("phone_number", event.target.value)}
                    className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white/12"
                    placeholder="Enter your phone number"
                    required
                  />
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">Password</span>
                <input
                  type="password"
                  value={mode === "login" ? loginForm.password : signupForm.password}
                  onChange={(event) =>
                    mode === "login"
                      ? handleLoginChange("password", event.target.value)
                      : handleSignupChange("password", event.target.value)
                  }
                  className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white/12"
                  placeholder="Enter your password"
                  required
                />
              </label>

              {mode === "signup" && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-200">Confirm Password</span>
                  <input
                    type="password"
                    value={signupForm.password_confirmation}
                    onChange={(event) =>
                      handleSignupChange("password_confirmation", event.target.value)
                    }
                    className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white/12"
                    placeholder="Confirm your password"
                    required
                  />
                </label>
              )}
            </div>

            {errorMessage && (
              <div className="mt-4 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {errorMessage}
              </div>
            )}

            <div className="mt-auto pt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(79,70,229,0.28)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading
                  ? "Please wait..."
                  : mode === "login"
                    ? "Login"
                    : "Create Account"}
              </button>

              <p className="mt-4 text-center text-sm text-slate-300">
                {mode === "login" ? "New to EduMentor AI?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => onModeChange(mode === "login" ? "signup" : "login")}
                  className="font-semibold text-blue-200 transition hover:text-white"
                >
                  {mode === "login" ? "Create account" : "Login here"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </aside>
    </div>
  );
}
