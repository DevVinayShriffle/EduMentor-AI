const roleConfigs = {
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
  return roleConfigs[role] || roleConfigs.admin;
}
