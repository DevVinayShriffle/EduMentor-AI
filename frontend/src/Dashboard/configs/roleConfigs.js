const roleConfigs = {
  student: {
    label: "Student",
    home: {
      eyebrow: "Student Dashboard",
      title: "Stay on track with structured learning and visible progress.",
      description:
        "Review your learning plan, continue revision, solve doubts with AI, and keep your daily quiz rhythm moving.",
      cards: [
        {
          label: "Next Action",
          value: "Continue revision shorts",
          text: "Resume the current module and rewatch key concept clips before your next class.",
        },
        {
          label: "Practice Rhythm",
          value: "Daily quiz pending",
          text: "Keep momentum by attempting today's AI-generated quiz and checking your score trend.",
        },
        {
          label: "Dashboard Focus",
          value: "Progress analytics",
          text: "Track completion, test results, and improvement points from one role-specific home.",
        },
      ],
    },
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        itemId: "dashboard-home",
        items: [],
      },
      {
        id: "learn",
        label: "Learn",
        items: [
          { id: "my-courses", label: "My Courses" },
          { id: "recordings", label: "Recordings" },
          { id: "shorts", label: "Shorts" },
          { id: "materials", label: "Materials" },
        ],
      },
      {
        id: "live-classes",
        label: "Live Classes",
        items: [
          { id: "upcoming-classes", label: "Upcoming Classes" },
          { id: "attendance", label: "Attendance" },
        ],
      },
      {
        id: "ai-tutor",
        label: "AI Tutor",
        itemId: "ai-tutor",
        items: [
          { id: "text-doubts", label: "Text Doubts" },
          { id: "image-doubts", label: "Image Doubts" },
          { id: "doubt-history", label: "Doubt History" },
        ],
      },
      {
        id: "tests",
        label: "Tests",
        items: [
          { id: "daily-quiz", label: "Daily Quiz" },
          { id: "weekly-exams", label: "Weekly Exams" },
          { id: "past-results", label: "Past Results" },
        ],
      },
      {
        id: "performance",
        label: "Performance",
        items: [
          { id: "progress-tracking", label: "Progress Tracking" },
          { id: "weak-topics", label: "Weak Topics" },
        ],
      },
      {
        id: "payments",
        label: "Payments",
        items: [
          { id: "subscriptions", label: "Subscriptions" },
          { id: "billing-history", label: "Billing History" },
        ],
      },
      {
        id: "profile",
        label: "Profile",
        items: [{ id: "settings", label: "Settings" }],
      },
    ],
  },
  teacher: {
    label: "Teacher",
    home: {
      eyebrow: "Teacher Dashboard",
      title: "Manage classes, content, and student performance from one control surface.",
      description:
        "Host live sessions, upload materials, review class progress, and monitor where students need the most help.",
      cards: [
        {
          label: "Class Flow",
          value: "Upcoming live session",
          text: "Prepare your next class, then publish the replay and supporting materials for revision.",
        },
        {
          label: "Content Work",
          value: "Upload notes and shorts",
          text: "Keep your course library fresh with PDFs, assignments, and topic-based revision videos.",
        },
        {
          label: "Student Insight",
          value: "Performance tracking",
          text: "Use attendance and test outcomes to spot weak areas and guide students effectively.",
        },
      ],
    },
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        itemId: "dashboard-home",
        items: [],
      },
      {
        id: "teaching",
        label: "Teaching",
        items: [
          { id: "my-courses", label: "My Courses" },
          { id: "live-classes", label: "Live Classes" },
          { id: "recordings", label: "Recordings" },
        ],
      },
      {
        id: "content",
        label: "Content",
        items: [
          { id: "shorts", label: "Shorts" },
          { id: "materials", label: "Study Materials" },
          { id: "assignments", label: "Assignments" },
        ],
      },
      {
        id: "assessments",
        label: "Assessments",
        items: [
          { id: "tests", label: "Tests" },
          { id: "results", label: "Results" },
          { id: "question-bank", label: "Question Bank" },
        ],
      },
      {
        id: "students",
        label: "Students",
        items: [
          { id: "roster", label: "Roster" },
          { id: "attendance", label: "Attendance" },
        ],
      },
      {
        id: "reports",
        label: "Reports",
        items: [
          { id: "performance-reports", label: "Performance Reports" },
          { id: "engagement", label: "Engagement" },
        ],
      },
      {
        id: "chat",
        label: "Chat",
        items: [
          { id: "student-doubts", label: "Student Doubts" },
          { id: "live-chat", label: "Live Chat" },
        ],
      },
      {
        id: "profile",
        label: "Profile",
        items: [{ id: "settings", label: "Settings" }],
      },
    ],
  },
  admin: {
    label: "Admin",
    home: {
      eyebrow: "Admin Dashboard",
      title: "Oversee the full platform with visibility across users, courses, and operations.",
      description:
        "Monitor the learning ecosystem at a system level, from user roles and content quality to performance and payments.",
      cards: [
        {
          label: "User Control",
          value: "Role oversight",
          text: "Manage students, teachers, and platform permissions through one centralized admin view.",
        },
        {
          label: "Platform Quality",
          value: "Course and class monitoring",
          text: "Review learning content, class coverage, and operational consistency across the platform.",
        },
        {
          label: "System Insight",
          value: "Analytics and growth",
          text: "Track active users, engagement, and revenue-related signals as the platform scales.",
        },
      ],
    },
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        itemId: "dashboard-home",
        items: [],
      },
      {
        id: "users",
        label: "Users",
        items: [
          { id: "students", label: "Students" },
          { id: "teachers", label: "Teachers" },
          { id: "admins", label: "Admins" },
          { id: "roles", label: "Roles & Permissions" },
        ],
      },
      {
        id: "courses",
        label: "Courses",
        items: [
          { id: "all-courses", label: "All Courses" },
          { id: "approvals", label: "Approvals" },
        ],
      },
      {
        id: "content",
        label: "Content",
        items: [
          { id: "recordings", label: "Recorded Lectures" },
          { id: "shorts", label: "Shorts" },
          { id: "materials", label: "Study Materials" },
          { id: "assignments", label: "Assignments" },
        ],
      },
      {
        id: "payments",
        label: "Payments",
        items: [
          { id: "transactions", label: "Transactions" },
          { id: "subscriptions", label: "Subscriptions" },
          { id: "refunds", label: "Refunds" },
          { id: "revenue", label: "Revenue" },
        ],
      },
      {
        id: "ai-monitor",
        label: "AI Monitor",
        items: [
          { id: "ai-doubt-logs", label: "Doubt Logs" },
          { id: "ai-quiz-logs", label: "Quiz Logs" },
          { id: "usage-limits", label: "Usage Limits" },
        ],
      },
      {
        id: "analytics",
        label: "Analytics",
        items: [
          { id: "revenue-analytics", label: "Revenue Analytics" },
          { id: "engagement-analytics", label: "Engagement Analytics" },
        ],
      },
      {
        id: "settings",
        label: "Settings",
        items: [
          { id: "platform-settings", label: "Platform Settings" },
          { id: "subscription-plans", label: "Subscription Plans" },
          { id: "ai-settings", label: "AI Settings" },
        ],
      },
      {
        id: "profile",
        label: "Profile",
        items: [{ id: "account-settings", label: "Account Settings" }],
      },
    ],
  },
};

export function getRoleConfig(role) {
  return roleConfigs[role] || roleConfigs.student;
}
