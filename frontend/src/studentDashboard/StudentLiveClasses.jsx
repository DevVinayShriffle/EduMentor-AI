import { CheckCircle2, LoaderCircle, LockKeyhole, Radio, Sparkles, Video } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createEnrollment, fetchCourses, fetchLiveClasses, fetchMyCourses, getMeetingUrl, joinLiveClass, leaveLiveClass } from "../utils/dashboardApi";

function formatDateTime(dateString) {
  if (!dateString) return "TBD";

  return new Date(dateString).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getStatusBadgeClass(isDarkTheme, status) {
  const statusMap = {
    live: isDarkTheme ? "bg-emerald-500/15 text-emerald-200" : "bg-emerald-100 text-emerald-700",
    scheduled: isDarkTheme ? "bg-sky-500/15 text-sky-200" : "bg-sky-100 text-sky-700",
    ended: isDarkTheme ? "bg-slate-500/15 text-slate-200" : "bg-slate-100 text-slate-700",
    cancelled: isDarkTheme ? "bg-rose-500/15 text-rose-200" : "bg-rose-100 text-rose-700",
  };

  return statusMap[status] || statusMap.scheduled;
}

export default function StudentLiveClasses() {
  const { isDarkTheme } = useOutletContext();
  const { token } = useAuth();
  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [subscribingCourseId, setSubscribingCourseId] = useState(null);
  const [joiningClassId, setJoiningClassId] = useState(null);
  const [leavingClassId, setLeavingClassId] = useState(null);

  const courseLookup = useMemo(() => {
    const mergedCourses = [...allCourses, ...enrolledCourses];
    return Object.fromEntries(mergedCourses.map((course) => [Number(course.id), course]));
  }, [allCourses, enrolledCourses]);

  const enrolledCourseIds = useMemo(() => new Set(enrolledCourses.map((course) => Number(course.id))), [enrolledCourses]);
  const unsubscribedCourses = useMemo(
    () => allCourses.filter((course) => !enrolledCourseIds.has(Number(course.id))),
    [allCourses, enrolledCourseIds]
  );

  const liveNowCount = liveClasses.filter((liveClass) => liveClass.status === "live").length;
  const upcomingCount = liveClasses.filter((liveClass) => liveClass.status === "scheduled").length;

  const loadData = async () => {
    if (!token) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const [courses, myCourses, myLiveClasses] = await Promise.all([fetchCourses(token), fetchMyCourses(token), fetchLiveClasses(token)]);
      setAllCourses(courses);
      setEnrolledCourses(myCourses);
      setLiveClasses(myLiveClasses);
    } catch (error) {
      setErrorMessage(error.message || "Unable to load live classes right now.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const handleSubscribe = async (course) => {
    setSubscribingCourseId(course.id);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await createEnrollment(token, course.id);
      setSuccessMessage(`Subscribed to ${course.title}. You can now unlock its live classes.`);
      await loadData();
    } catch (error) {
      if ((error.message || "").match(/has already been taken/i)) {
        setSuccessMessage(`${course.title} is already available in your enrolled courses.`);
        await loadData();
      } else {
        setErrorMessage(error.message || "Unable to subscribe to that course right now.");
      }
    } finally {
      setSubscribingCourseId(null);
    }
  };

  const handleJoin = async (liveClass) => {
    setJoiningClassId(liveClass.id);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const payload = await joinLiveClass(token, liveClass.id);
      setActiveSession({
        liveClassId: liveClass.id,
        title: payload.title,
        roomName: payload.room_name,
        domain: payload.domain,
      });
      window.open(getMeetingUrl(payload.room_name, payload.domain), "_blank", "noopener,noreferrer");
      setSuccessMessage(`Joined ${payload.title}. The meeting room opened in a new tab.`);
    } catch (error) {
      setErrorMessage(error.message || "Unable to join the live class.");
    } finally {
      setJoiningClassId(null);
    }
  };

  const handleLeave = async () => {
    if (!activeSession) return;

    setLeavingClassId(activeSession.liveClassId);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await leaveLiveClass(token, activeSession.liveClassId);
      setSuccessMessage(`Left ${activeSession.title}.`);
      setActiveSession(null);
    } catch (error) {
      setErrorMessage(error.message || "Unable to leave the live class.");
    } finally {
      setLeavingClassId(null);
    }
  };

  const cardClass = isDarkTheme
    ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(17,24,39,0.9))] text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]"
    : "border-white/75 bg-white/92 text-slate-900 shadow-[0_20px_60px_rgba(37,99,235,0.08)]";
  const mutedClass = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const accentClass = isDarkTheme ? "text-cyan-300" : "text-sky-700";

  return (
    <div className="space-y-6">
      <section className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Live Classes</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Subscribe to a course, unlock its live sessions, and join the room when your teacher goes live.</h1>
        <p className={`mt-3 max-w-3xl text-sm leading-7 md:text-base ${mutedClass}`}>For now, subscription is mocked through instant enrollment. No payment is required yet, so you can subscribe and start joining eligible live classes immediately.</p>
      </section>

      {(errorMessage || successMessage) && (
        <section className={`rounded-[24px] border px-4 py-3 ${cardClass}`}>
          {errorMessage ? <p className="text-sm font-medium text-rose-400">{errorMessage}</p> : null}
          {successMessage ? <p className="text-sm font-medium text-emerald-400">{successMessage}</p> : null}
        </section>
      )}

      {activeSession ? (
        <section className={`rounded-[28px] border p-5 ${cardClass}`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Active Session</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">{activeSession.title}</h2>
              <p className={`mt-2 text-sm leading-6 ${mutedClass}`}>Meeting room: {getMeetingUrl(activeSession.roomName, activeSession.domain)}. Only teachers need full camera workflow later, so for now this simply opens the shared room link.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={getMeetingUrl(activeSession.roomName, activeSession.domain)} target="_blank" rel="noreferrer" className="rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]">
                Reopen room
              </a>
              <button type="button" onClick={handleLeave} disabled={leavingClassId === activeSession.liveClassId} className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${isDarkTheme ? "border-white/10 bg-white/5 text-slate-100 hover:bg-white/10" : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"} disabled:cursor-not-allowed disabled:opacity-60`}>
                {leavingClassId === activeSession.liveClassId ? "Leaving..." : "Leave class"}
              </button>
            </div>
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Enrolled Courses", value: String(enrolledCourses.length), note: "Courses already unlocked for you" },
          { label: "Live Right Now", value: String(liveNowCount), note: "Sessions you can join immediately" },
          { label: "Upcoming Sessions", value: String(upcomingCount), note: "Scheduled classes in your active courses" },
          { label: "Courses To Unlock", value: String(unsubscribedCourses.length), note: "Mock subscribe to access future sessions" },
        ].map((item) => (
          <article key={item.label} className={`rounded-[28px] border p-5 ${cardClass}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>{item.label}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">{item.value}</h2>
            <p className={`mt-3 text-sm leading-6 ${mutedClass}`}>{item.note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className={`rounded-[28px] border p-5 ${cardClass}`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Your Eligible Sessions</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Join classes from subscribed courses</h2>
            </div>
            <Video className={accentClass} size={22} />
          </div>

          {isLoading ? (
            <div className="mt-8 flex items-center gap-3">
              <LoaderCircle className="animate-spin" size={18} />
              <p className={`text-sm ${mutedClass}`}>Loading your live classes...</p>
            </div>
          ) : liveClasses.length ? (
            <div className="mt-5 space-y-3">
              {liveClasses.map((liveClass) => {
                const course = courseLookup[Number(liveClass.course_id)];
                const isJoining = joiningClassId === liveClass.id;

                return (
                  <article key={liveClass.id} className={`rounded-2xl border p-4 ${isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold">{liveClass.title}</h3>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusBadgeClass(isDarkTheme, liveClass.status)}`}>{liveClass.status}</span>
                        </div>
                        <p className={`mt-2 text-sm ${mutedClass}`}>{course?.title || `Course #${liveClass.course_id}`}</p>
                        <p className={`mt-1 text-sm ${mutedClass}`}>{formatDateTime(liveClass.scheduled_start_time)}</p>
                        {liveClass.description ? <p className={`mt-3 text-sm leading-6 ${mutedClass}`}>{liveClass.description}</p> : null}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {liveClass.status === "live" ? (
                          <button type="button" onClick={() => handleJoin(liveClass)} disabled={isJoining} className="rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
                            <span className="inline-flex items-center gap-2">{isJoining ? <LoaderCircle className="animate-spin" size={16} /> : <Radio size={16} />} Join now</span>
                          </button>
                        ) : liveClass.status === "scheduled" ? (
                          <div className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${isDarkTheme ? "border-white/10 bg-white/5 text-slate-100" : "border-slate-200 bg-white text-slate-900"}`}>
                            Available when class goes live
                          </div>
                        ) : (
                          <div className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${isDarkTheme ? "border-white/10 bg-white/5 text-slate-300" : "border-slate-200 bg-white text-slate-600"}`}>
                            Session {liveClass.status}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className={`mt-8 rounded-2xl border p-5 ${isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
              <p className="text-lg font-semibold">No eligible live classes yet</p>
              <p className={`mt-2 text-sm leading-6 ${mutedClass}`}>Subscribe to a course first, or wait for your teacher to schedule the next live session in one of your enrolled courses.</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <section className={`rounded-[28px] border p-5 ${cardClass}`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Mock Course Subscription</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">Unlock more live classes</h2>
              </div>
              <Sparkles className={accentClass} size={22} />
            </div>

            <div className="mt-5 space-y-3">
              {unsubscribedCourses.length ? (
                unsubscribedCourses.map((course) => {
                  const isSubscribing = subscribingCourseId === course.id;

                  return (
                    <article key={course.id} className={`rounded-2xl border p-4 ${isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">{course.title}</h3>
                          <p className={`mt-2 text-sm leading-6 ${mutedClass}`}>{course.description}</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className={`text-xs font-semibold uppercase tracking-[0.18em] ${accentClass}`}>{course.target_exam || "General"} • {course.class_level || "All levels"}</div>
                          <button type="button" onClick={() => handleSubscribe(course)} disabled={isSubscribing} className="rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
                            <span className="inline-flex items-center gap-2">{isSubscribing ? <LoaderCircle className="animate-spin" size={16} /> : <LockKeyhole size={16} />} Subscribe now</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className={`rounded-2xl border p-4 ${isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
                  <p className="text-lg font-semibold">All published courses are already unlocked</p>
                  <p className={`mt-2 text-sm leading-6 ${mutedClass}`}>You are subscribed to every currently available course, so any future live class in those courses will appear in your eligible sessions list.</p>
                </div>
              )}
            </div>
          </section>

          <section className={`rounded-[28px] border p-5 ${cardClass}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Your Active Courses</p>
            <div className="mt-5 space-y-3">
              {enrolledCourses.length ? (
                enrolledCourses.map((course) => (
                  <div key={course.id} className={`flex items-center justify-between rounded-2xl border p-4 ${isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
                    <div>
                      <p className="font-semibold">{course.title}</p>
                      <p className={`mt-1 text-sm ${mutedClass}`}>{course.target_exam || "Course access active"}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                      <CheckCircle2 size={14} />
                      Subscribed
                    </span>
                  </div>
                ))
              ) : (
                <p className={`text-sm leading-6 ${mutedClass}`}>You have not subscribed to any course yet. Use the mock subscribe buttons above to unlock a course and then join its live classes.</p>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
