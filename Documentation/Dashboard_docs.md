# EduMentor AI Dashboard Roadmap

## Goal
Build separate dashboards for `Student`, `Teacher`, and `Admin` because each role has different jobs, permissions, and success metrics.

- `Student` dashboard should optimize learning continuity.
- `Teacher` dashboard should optimize teaching and content operations.
- `Admin` dashboard should optimize platform control, quality, revenue, and analytics.

---

## Product Direction

### Core Principle
Do not overload the sidebar with every possible item.

Use:
- a short primary sidebar
- grouped submenus inside major sections
- role-specific home dashboards with the most important actions surfaced first

### Recommended Architecture
Use `one shared dashboard shell` plus `role-based configs/components`.

This means:
- one common layout shell for sidebar, top navbar, content outlet, and responsive behavior
- separate role configs for menu items, dashboard cards, and route access
- separate page components where role workflows differ significantly

Avoid:
- one giant file containing all student, teacher, and admin logic
- fully separate duplicated dashboard shells unless the UI structure becomes drastically different later

### Role Summary

| Role | Primary Purpose | Main Focus |
| --- | --- | --- |
| Student | Consume learning content | Learn, attend classes, revise, solve doubts, attempt tests |
| Teacher | Deliver teaching and manage content | Conduct classes, upload materials, create tests, support students |
| Admin | Control the platform | Manage users, content, payments, AI usage, analytics |

---

## Final Recommended Sidebar Structure

## Student Sidebar

```txt
Dashboard
Learn
Live Classes
AI Tutor
Tests
Performance
Payments
Profile
```

### Student Learn Submenu

```txt
My Courses
Recordings
Shorts
Materials
```

### Student Tests Submenu

```txt
Daily AI Quiz
Weekly Exams
Past Results
```

---

## Teacher Sidebar

```txt
Dashboard
Teaching
Content
Assessments
Students
Reports
Chat
Profile
```

### Teacher Teaching Submenu

```txt
My Courses
Live Classes
Recordings
```

### Teacher Content Submenu

```txt
Shorts
Study Materials
Assignments
```

### Teacher Assessments Submenu

```txt
Tests
Results
Question Bank
```

---

## Admin Sidebar

```txt
Dashboard
Users
Courses
Content
Payments
AI Monitor
Analytics
Settings
Profile
```

### Admin Users Submenu

```txt
Students
Teachers
Admins
Roles
Permissions
Blocked Users
```

### Admin Content Submenu

```txt
Recorded Lectures
Shorts
Study Materials
Assignments
Pending Approval
Rejected Content
```

### Admin Payments Submenu

```txt
Transactions
Subscriptions
Refunds
Revenue
Invoices
```

---

## Dashboard Home Screens

## Student Home Cards

```txt
Continue Learning
Upcoming Live Class
Today's AI Quiz
Weekly Exam Status
Course Progress
Recent Recorded Lectures
Recommended Shorts
Performance Summary
AI Doubt History
```

### Student Home Purpose
- bring the learner back into the next action quickly
- show progress and pending academic work
- reduce friction for doubts, quizzes, and revision

---

## Teacher Home Cards

```txt
Today's Classes
Upcoming Live Sessions
Pending Uploads
Recent Student Doubts
Test Submissions
Class Attendance
Weak Topics Summary
Content Engagement
```

### Teacher Home Purpose
- show the teaching schedule first
- surface pending academic operations
- highlight student issues that need intervention

---

## Admin Home Cards

```txt
Total Students
Total Teachers
Active Courses
Live Classes Today
Revenue This Month
Pending Payments
AI Usage
Course Popularity
Active Users
Platform Engagement
```

### Admin Home Purpose
- show platform health at a glance
- expose business, academic, and AI system metrics
- make risk areas visible early

---

## Detailed Role Modules

## Student Modules

### Dashboard

```txt
Welcome back
Course progress
Next class
Pending quiz
Weekly test reminder
Recent activity
```

### My Courses

```txt
Enrolled courses
Syllabus
Modules
Live classes
Recordings
Materials
Tests
Progress
```

### Live Classes

```txt
Upcoming classes
Ongoing class
Past classes
Join button
Attendance status
```

### Recorded Lectures

```txt
All recordings
By course
By subject
Recently watched
Continue watching
```

### Shorts / Revision Videos

```txt
Latest shorts
Subject-wise shorts
Saved shorts
Watched shorts
```

### Study Materials

```txt
Notes
PDFs
Assignments
Download history
```

### AI Doubt Solver

```txt
Ask text doubt
Upload image doubt
Doubt history
Saved explanations
```

### Daily AI Quiz

```txt
Today's quiz
Previous quizzes
Quiz performance
```

### Weekly Exams

```txt
Upcoming exams
Attempt exam
Past results
Rank / score
```

### My Performance

```txt
Course completion
Test performance trend
Weak topics
Attendance
AI usage history
Improvement suggestions
```

---

## Teacher Modules

### Dashboard

```txt
Today's schedule
Upcoming classes
Pending tests
Student doubts
Recent uploads
Class performance summary
```

### My Courses

```txt
Assigned courses
Course syllabus
Course students
Course content
```

### Live Classes

```txt
Schedule live class
Start live class
Manage ongoing class
View past classes
```

### Recorded Lectures

```txt
Auto recordings
Review recording
Publish / unpublish
Attach to module
```

### Shorts Manager

```txt
Upload short
My shorts
Draft shorts
Published shorts
```

### Study Materials

```txt
Upload notes
Upload PDFs
Manage materials
Assign to course
```

### Assignments

```txt
Create assignment
Submitted assignments
Pending review
Graded assignments
```

### Tests / Exams

```txt
Create test
Weekly tests
Custom tests
Question bank
Results
```

### Students

```txt
My students
Course-wise students
Attendance
Progress
Weak areas
```

### Performance Reports

```txt
Attendance reports
Test reports
Weak topic analysis
Content engagement
Student progress
```

### Doubt Support / Chat

```txt
Student doubts
Live chat
Resolved doubts
Pending doubts
```

---

## Admin Modules

### Dashboard

```txt
Revenue
Active users
New enrollments
Course sales
Live class activity
AI usage
Payment issues
Content pending review
```

### User Management

```txt
All users
Add user
Roles & permissions
Blocked users
User activity
```

### Student Management

```txt
All students
Enrolled students
Payment status
Performance overview
AI usage
```

### Teacher Management

```txt
All teachers
Add teacher
Assign course
Teacher performance
Teacher content
```

### Course Management

```txt
All courses
Create course
Approve courses
Course syllabus
Course pricing
Course access
```

### Live Classes

```txt
All live classes
Upcoming classes
Ongoing classes
Completed classes
Attendance monitoring
```

### Recorded Lectures

```txt
All recordings
Pending review
Published recordings
Rejected recordings
```

### Shorts Management

```txt
All shorts
Pending approval
Published shorts
Rejected shorts
```

### Study Materials

```txt
All materials
Notes
PDFs
Assignments
Approve / remove content
```

### Tests / Exams

```txt
All tests
Weekly exams
Results
Question bank
Exam analytics
```

### Payments

```txt
All payments
Successful payments
Failed payments
Pending payments
Invoices
Revenue report
```

### Subscriptions

```txt
Active subscriptions
Expired subscriptions
Cancelled subscriptions
Renewals
```

### Refunds

```txt
Refund requests
Approved refunds
Rejected refunds
Refund history
```

### AI Monitoring

```txt
AI doubt logs
AI quiz logs
Image doubt logs
Usage limits
Flagged AI responses
AI cost monitoring
```

### Analytics / Reports

```txt
Revenue analytics
Student analytics
Teacher analytics
Course analytics
Engagement analytics
AI usage analytics
```

### Settings

```txt
Platform settings
Payment settings
AI settings
Notification settings
Security settings
Role permissions
```

---

## Recommended Build Roadmap

## Technical Architecture

### Preferred Approach

```txt
DashboardShell
  - Sidebar
  - Topbar
  - ContentOutlet
  - MobileDrawer
```

Then attach role-based behavior through:

```txt
roleConfigs/
  - studentConfig
  - teacherConfig
  - adminConfig
```

And page-level components such as:

```txt
dashboard/
  - student/
  - teacher/
  - admin/
  - shared/
```

### What Should Be Shared
- dashboard shell layout
- sidebar container behavior
- top navbar layout
- responsive drawer behavior
- route guard pattern
- common cards, tables, filters, and empty states

### What Should Be Role-Based
- sidebar menu structure
- dashboard home cards
- route permissions
- page content modules
- analytics widgets
- quick actions

### Best Practical Rule
- if only labels, menu items, and cards differ: use config
- if workflow and UI behavior differ meaningfully: use separate components
- keep business logic close to the role-specific feature instead of stacking many `if role === ...` checks in one file

### Why This Is Best
- faster to build than three completely separate dashboards
- cleaner than putting all roles in one large file
- easier to scale as student, teacher, and admin features grow
- preserves a consistent UI system across all roles

---

## Phase 1: Navigation Foundations
- create role detection and route guards
- build separate sidebar configs for student, teacher, and admin
- create dashboard shell with navbar, sidebar, content area, and responsive collapse

### Deliverables
- role-based layout switching
- sidebar groups and submenu support
- placeholder route pages for all major dashboard modules

---

## Phase 2: Student Dashboard MVP
- build student dashboard home
- build `Learn`, `AI Tutor`, `Tests`, `Performance`, and `Payments`
- connect course progress, live class reminders, and quiz status cards

### Priority Modules
1. Dashboard
2. My Courses
3. Live Classes
4. Recordings
5. AI Doubts
6. Daily Quiz
7. Weekly Exams
8. Performance

---

## Phase 3: Teacher Workspace MVP
- build teacher dashboard home
- add course teaching flows and content management
- enable tests, assignments, attendance, and doubt support

### Priority Modules
1. Dashboard
2. Teaching
3. Content
4. Assessments
5. Students
6. Reports
7. Chat

---

## Phase 4: Admin Control Center MVP
- build admin dashboard summary
- add user, course, content, payment, and analytics management
- enable AI monitoring and audit visibility

### Priority Modules
1. Dashboard
2. Users
3. Courses
4. Content
5. Payments
6. AI Monitor
7. Analytics
8. Settings

---

## Analytics Priorities

## Student Analytics
- course completion %
- test performance trend
- weak topics
- attendance
- AI usage history

## Teacher Analytics
- class attendance
- student performance summaries
- weak topic analysis
- content engagement

## Admin Analytics
- revenue reporting
- active users
- course popularity
- platform engagement
- AI usage and cost

---

## UX Notes
- student dashboard should minimize clicks to resume learning
- teacher dashboard should minimize friction for content and class management
- admin dashboard should prioritize clarity, hierarchy, and monitoring
- mobile layout should collapse sidebars into a drawer
- avoid long flat sidebars; prefer grouped menus with expandable sections

---

## Final Recommendation

If the goal is a professional, scalable dashboard:

- use `one shared dashboard shell`
- use `role-based configs` for menus, cards, and route access
- use `role-specific components` for workflows that differ substantially
- keep sidebars short and grouped
- use role-specific home cards
- ship in phases, starting with student learning flow first

This structure best matches the EduMentor AI platform model and gives a clear path for implementation.
