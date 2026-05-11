import { CalendarDays, CheckCircle2, LoaderCircle, PlayCircle, Radio, SquarePen, Video } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CustomSelect from "../components/CustomSelect";
import { cancelLiveClass, createLiveClass, endLiveClass, fetchCourses, fetchLiveClasses, getMeetingUrl, startLiveClass, updateLiveClass } from "../utils/dashboardApi";

const initialFormState = {
  course_id: "",
  title: "",
  description: "",
  start_date: "",
  start_time: "",
  recording_enabled: true,
};

function splitDateTime(dateString) {
  if (!dateString) {
    return {
      date: "",
      time: "",
    };
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return {
      date: "",
      time: "",
    };
  }

  const timezoneOffset = date.getTimezoneOffset();
  const normalizedDate = new Date(date.getTime() - timezoneOffset * 60 * 1000);
  const isoDateTime = normalizedDate.toISOString().slice(0, 16);

  return {
    date: isoDateTime.slice(0, 10),
    time: isoDateTime.slice(11, 16),
  };
}

function combineDateTime(dateValue, timeValue) {
  if (!dateValue || !timeValue) return "";

  return `${dateValue}T${timeValue}`;
}

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

export default function TeacherLiveClasses() {
  const { isDarkTheme } = useOutletContext();
  const { token } = useAuth();
  const startDateInputRef = useRef(null);
  const startTimeInputRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [formState, setFormState] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeActionId, setActiveActionId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const courseOptions = useMemo(() => courses.map((course) => ({ value: String(course.id), label: course.title })), [courses]);
  const courseLookup = useMemo(() => Object.fromEntries(courses.map((course) => [Number(course.id), course])), [courses]);

  const loadData = async () => {
    if (!token) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const [teacherCourses, teacherLiveClasses] = await Promise.all([fetchCourses(token), fetchLiveClasses(token)]);
      setCourses(teacherCourses);
      setLiveClasses(teacherLiveClasses);
    } catch (error) {
      setErrorMessage(error.message || "Unable to load live classes right now.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const resetForm = () => {
    setFormState(initialFormState);
    setEditingId(null);
  };

  const handleInputChange = (field, value) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const openNativePicker = (inputRef) => {
    if (!inputRef.current) return;

    inputRef.current.focus();

    if (typeof inputRef.current.showPicker === "function") {
      inputRef.current.showPicker();
    }
  };

  const handleEdit = (liveClass) => {
    setEditingId(liveClass.id);
    setSuccessMessage("");
    setErrorMessage("");
    setFormState({
      course_id: String(liveClass.course_id || ""),
      title: liveClass.title || "",
      description: liveClass.description || "",
      start_date: splitDateTime(liveClass.scheduled_start_time).date,
      start_time: splitDateTime(liveClass.scheduled_start_time).time,
      recording_enabled: Boolean(liveClass.recording_enabled),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!formState.course_id) {
      setErrorMessage("Please select a course before saving the live class.");
      setIsSubmitting(false);
      return;
    }

    if (!formState.start_date || !formState.start_time) {
      setErrorMessage("Please choose the live class start date and time.");
      setIsSubmitting(false);
      return;
    }

    const scheduledStartTime = combineDateTime(formState.start_date, formState.start_time);
    const payload = {
      course_id: Number(formState.course_id),
      title: formState.title,
      description: formState.description,
      scheduled_start_time: scheduledStartTime,
      recording_enabled: Boolean(formState.recording_enabled),
    };

    try {
      if (editingId) {
        await updateLiveClass(token, editingId, payload);
        setSuccessMessage("Live class updated successfully.");
      } else {
        await createLiveClass(token, payload);
        setSuccessMessage("Live class scheduled successfully.");
      }

      resetForm();
      await loadData();
    } catch (error) {
      setErrorMessage(error.message || "Unable to save the live class.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const runAction = async (liveClassId, action) => {
    setActiveActionId(liveClassId);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (action === "start") {
        const payload = await startLiveClass(token, liveClassId);
        window.open(getMeetingUrl(payload.room_name, payload.domain), "_blank", "noopener,noreferrer");
        setSuccessMessage("Live class started and meeting room opened.");
      }

      if (action === "end") {
        await endLiveClass(token, liveClassId);
        setSuccessMessage("Live class ended.");
      }

      if (action === "cancel") {
        await cancelLiveClass(token, liveClassId);
        setSuccessMessage("Live class cancelled.");
      }

      await loadData();
    } catch (error) {
      setErrorMessage(error.message || "Unable to complete that action.");
    } finally {
      setActiveActionId(null);
    }
  };

  const cardClass = isDarkTheme
    ? "border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(17,24,39,0.9))] text-slate-100 shadow-[0_24px_70px_rgba(2,6,23,0.34)]"
    : "border-white/75 bg-white/92 text-slate-900 shadow-[0_20px_60px_rgba(37,99,235,0.08)]";
  const mutedClass = isDarkTheme ? "text-slate-300" : "text-slate-600";
  const accentClass = isDarkTheme ? "text-fuchsia-300" : "text-blue-700";
  const inputClass = isDarkTheme
    ? "border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500"
    : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400";
  const secondaryButtonClass = isDarkTheme
    ? "border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
    : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50";
  const selectMenuClass = isDarkTheme ? "border-white/10 bg-slate-900/95 text-white backdrop-blur-xl" : "border-slate-200 bg-white text-slate-900";
  const selectOptionClass = isDarkTheme ? "hover:bg-white/8" : "hover:bg-slate-50";
  const selectSelectedClass = isDarkTheme ? "bg-white/10 text-fuchsia-100" : "bg-indigo-50 text-indigo-700";

  return (
    <div className="space-y-6">
      <section className={`rounded-[32px] border p-6 md:p-8 ${cardClass}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Live Classes</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Schedule, launch, and monitor live teaching sessions from one control room.</h1>
        <p className={`mt-3 max-w-3xl text-sm leading-7 md:text-base ${mutedClass}`}>Teachers can create classes for their own courses, update the session plan, start the room when it goes live, and end or cancel it when needed.</p>
      </section>

      {(errorMessage || successMessage) && (
        <section className={`rounded-[24px] border px-4 py-3 ${cardClass}`}>
          {errorMessage ? <p className="text-sm font-medium text-rose-400">{errorMessage}</p> : null}
          {successMessage ? <p className="text-sm font-medium text-emerald-400">{successMessage}</p> : null}
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className={`rounded-[28px] border p-5 ${cardClass}`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>{editingId ? "Edit Session" : "Create Session"}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">{editingId ? "Update live class plan" : "Schedule a new live class"}</h2>
            </div>
            <Video className={accentClass} size={22} />
          </div>

          <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm">
              <span className="font-medium">Course</span>
              <CustomSelect
                value={formState.course_id}
                onChange={(nextValue) => handleInputChange("course_id", nextValue)}
                options={courseOptions}
                placeholder="Select a course"
                disabled={!courseOptions.length}
                buttonClassName={inputClass}
                menuClassName={selectMenuClass}
                optionClassName={selectOptionClass}
                selectedOptionClassName={selectSelectedClass}
                iconClassName={isDarkTheme ? "text-slate-300" : "text-slate-500"}
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="font-medium">Session title</span>
              <input value={formState.title} onChange={(event) => handleInputChange("title", event.target.value)} className={`rounded-2xl border px-4 py-3 outline-none transition ${inputClass}`} placeholder="Organic chemistry doubt clinic" required />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="font-medium">Description</span>
              <textarea value={formState.description} onChange={(event) => handleInputChange("description", event.target.value)} rows={4} className={`rounded-2xl border px-4 py-3 outline-none transition ${inputClass}`} placeholder="What will be covered in this session?" />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Start date</span>
                <input
                  ref={startDateInputRef}
                  type="date"
                  value={formState.start_date}
                  onClick={() => openNativePicker(startDateInputRef)}
                  onFocus={() => openNativePicker(startDateInputRef)}
                  onChange={(event) => handleInputChange("start_date", event.target.value)}
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${inputClass}`}
                  required
                />
              </label>

              <label className="grid gap-2 text-sm">
                <span className="font-medium">Start time</span>
                <input
                  ref={startTimeInputRef}
                  type="time"
                  value={formState.start_time}
                  onClick={() => openNativePicker(startTimeInputRef)}
                  onFocus={() => openNativePicker(startTimeInputRef)}
                  onChange={(event) => handleInputChange("start_time", event.target.value)}
                  className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${inputClass}`}
                  required
                />
              </label>
            </div>

            <label className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm ${inputClass}`}>
              <input type="checkbox" checked={formState.recording_enabled} onChange={(event) => handleInputChange("recording_enabled", event.target.checked)} className="h-4 w-4 rounded border-slate-300" />
              <span>Recording enabled for replay and archive</span>
            </label>

            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" disabled={isSubmitting || !courses.length} className="rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? "Saving..." : editingId ? "Update live class" : "Create live class"}
              </button>
              {editingId ? (
                <button type="button" onClick={resetForm} className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${secondaryButtonClass}`}>
                  Cancel editing
                </button>
              ) : null}
            </div>
          </form>

          {!courses.length && !isLoading ? <p className={`mt-4 text-sm ${mutedClass}`}>No teacher courses are available yet. Create or publish a course first, then return here to schedule live classes.</p> : null}
        </div>

        <div className={`rounded-[28px] border p-5 ${cardClass}`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${accentClass}`}>Session Queue</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Manage scheduled and live sessions</h2>
            </div>
            <CalendarDays className={accentClass} size={22} />
          </div>

          {isLoading ? (
            <div className="mt-8 flex items-center gap-3">
              <LoaderCircle className="animate-spin" size={18} />
              <p className={`text-sm ${mutedClass}`}>Loading live classes...</p>
            </div>
          ) : liveClasses.length ? (
            <div className="mt-5 space-y-3">
              {liveClasses.map((liveClass) => {
                const isBusy = activeActionId === liveClass.id;
                const course = courseLookup[Number(liveClass.course_id)];
                const meetingUrl = getMeetingUrl(liveClass.room_name);

                return (
                  <article key={liveClass.id} className={`rounded-2xl border p-4 ${isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold">{liveClass.title}</h3>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusBadgeClass(isDarkTheme, liveClass.status)}`}>{liveClass.status}</span>
                        </div>
                        <p className={`mt-2 text-sm ${mutedClass}`}>{course?.title || `Course #${liveClass.course_id}`}</p>
                        <p className={`mt-1 text-sm ${mutedClass}`}>{formatDateTime(liveClass.scheduled_start_time)}{liveClass.scheduled_end_time ? ` - ${formatDateTime(liveClass.scheduled_end_time)}` : ""}</p>
                        {liveClass.description ? <p className={`mt-3 text-sm leading-6 ${mutedClass}`}>{liveClass.description}</p> : null}
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]">
                          <span className={accentClass}>{liveClass.recording_enabled ? "Recording Enabled" : "Recording Off"}</span>
                          <a href={meetingUrl} target="_blank" rel="noreferrer" className={isDarkTheme ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-950"}>
                            Open room link
                          </a>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {liveClass.status === "scheduled" ? (
                          <>
                            <button type="button" onClick={() => handleEdit(liveClass)} className={`rounded-2xl border px-3 py-2 text-sm font-semibold transition ${secondaryButtonClass}`}>
                              <span className="inline-flex items-center gap-2"><SquarePen size={16} /> Edit</span>
                            </button>
                            <button type="button" disabled={isBusy} onClick={() => runAction(liveClass.id, "start")} className="rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-3 py-2 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
                              <span className="inline-flex items-center gap-2">{isBusy ? <LoaderCircle className="animate-spin" size={16} /> : <PlayCircle size={16} />} Start</span>
                            </button>
                            <button type="button" disabled={isBusy} onClick={() => runAction(liveClass.id, "cancel")} className="rounded-2xl border border-rose-300/40 px-3 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:opacity-60">
                              Cancel
                            </button>
                          </>
                        ) : null}

                        {liveClass.status === "live" ? (
                          <>
                            <a href={meetingUrl} target="_blank" rel="noreferrer" className="rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 px-3 py-2 text-sm font-semibold text-white transition hover:scale-[1.01]">
                              <span className="inline-flex items-center gap-2"><Radio size={16} /> Open room</span>
                            </a>
                            <button type="button" disabled={isBusy} onClick={() => runAction(liveClass.id, "end")} className={`rounded-2xl border px-3 py-2 text-sm font-semibold transition ${secondaryButtonClass}`}>
                              <span className="inline-flex items-center gap-2">{isBusy ? <LoaderCircle className="animate-spin" size={16} /> : <CheckCircle2 size={16} />} End class</span>
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className={`mt-8 rounded-2xl border p-5 ${isDarkTheme ? "border-white/10 bg-white/5" : "border-slate-200/80 bg-slate-50/80"}`}>
              <p className="text-lg font-semibold">No live classes scheduled yet</p>
              <p className={`mt-2 text-sm leading-6 ${mutedClass}`}>Once you create a live class, it will show up here with start, edit, and status controls.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
