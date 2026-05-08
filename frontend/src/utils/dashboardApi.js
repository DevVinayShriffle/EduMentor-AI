const API_BASE_URL = "http://localhost:3000";

function buildHeaders(token, extras = {}) {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    ...extras,
  };
}

async function parseResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.errors?.join(", ") || data.message || "Request failed";
    throw new Error(errorMessage);
  }

  return data;
}

function normalizeJsonApiCourse(courseResource) {
  return {
    id: Number(courseResource.id),
    ...courseResource.attributes,
  };
}

function normalizePlainCourse(course) {
  return {
    id: Number(course.id),
    title: course.title,
    description: course.description,
    status: course.status,
    price: course.price,
    currency: course.currency,
    target_exam: course.target_exam,
    class_level: course.class_level,
    language: course.language,
  };
}

export function getMeetingUrl(roomName, domain = "meet.jit.si") {
  return `https://${domain}/${roomName}`;
}

export async function fetchCourses(token) {
  const response = await fetch(`${API_BASE_URL}/api/v1/courses`, {
    headers: buildHeaders(token),
  });
  const data = await parseResponse(response);
  return (data.data?.data || []).map(normalizeJsonApiCourse);
}

export async function fetchMyCourses(token) {
  const response = await fetch(`${API_BASE_URL}/api/v1/my-courses`, {
    headers: buildHeaders(token),
  });
  const data = await parseResponse(response);
  return (data.data || []).map(normalizePlainCourse);
}

export async function createEnrollment(token, courseId) {
  const response = await fetch(`${API_BASE_URL}/api/v1/enrollments`, {
    method: "POST",
    headers: buildHeaders(token, { "Content-Type": "application/json" }),
    body: JSON.stringify({ enrollment: { course_id: courseId } }),
  });
  return parseResponse(response);
}

export async function fetchLiveClasses(token) {
  const response = await fetch(`${API_BASE_URL}/api/v1/live_classes`, {
    headers: buildHeaders(token),
  });
  const data = await parseResponse(response);
  return data.data || [];
}

export async function createLiveClass(token, payload) {
  const response = await fetch(`${API_BASE_URL}/api/v1/live_classes`, {
    method: "POST",
    headers: buildHeaders(token, { "Content-Type": "application/json" }),
    body: JSON.stringify({ live_class: payload }),
  });
  const data = await parseResponse(response);
  return data.data;
}

export async function updateLiveClass(token, liveClassId, payload) {
  const response = await fetch(`${API_BASE_URL}/api/v1/live_classes/${liveClassId}`, {
    method: "PATCH",
    headers: buildHeaders(token, { "Content-Type": "application/json" }),
    body: JSON.stringify({ live_class: payload }),
  });
  const data = await parseResponse(response);
  return data.data;
}

export async function startLiveClass(token, liveClassId) {
  const response = await fetch(`${API_BASE_URL}/api/v1/live_classes/${liveClassId}/start`, {
    method: "PATCH",
    headers: buildHeaders(token),
  });
  const data = await parseResponse(response);
  return data.data;
}

export async function endLiveClass(token, liveClassId) {
  const response = await fetch(`${API_BASE_URL}/api/v1/live_classes/${liveClassId}/end`, {
    method: "PATCH",
    headers: buildHeaders(token),
  });
  const data = await parseResponse(response);
  return data;
}

export async function cancelLiveClass(token, liveClassId) {
  const response = await fetch(`${API_BASE_URL}/api/v1/live_classes/${liveClassId}/cancel`, {
    method: "PATCH",
    headers: buildHeaders(token),
  });
  const data = await parseResponse(response);
  return data;
}

export async function joinLiveClass(token, liveClassId) {
  const response = await fetch(`${API_BASE_URL}/api/v1/live_classes/${liveClassId}/join`, {
    method: "POST",
    headers: buildHeaders(token),
  });
  const data = await parseResponse(response);
  return data.data;
}

export async function leaveLiveClass(token, liveClassId) {
  const response = await fetch(`${API_BASE_URL}/api/v1/live_classes/${liveClassId}/leave`, {
    method: "POST",
    headers: buildHeaders(token),
  });
  return parseResponse(response);
}
