# EduMentor AI: Personalized Learning Dashboard With Progress Tracking

## 1. Overview

EduMentor AI is an AI-powered online learning platform for students and competitive exam aspirants. It combines long-term structured courses with live teaching, recorded lectures, short-form revision content, AI-assisted learning, and centralized administrative control.

The platform supports three primary roles:

- Student: consumes courses, classes, tests, materials, and AI support
- Teacher: delivers classes, uploads content, and monitors learners
- Admin: manages users, courses, payments, analytics, and platform oversight

## 2. Product Goals

- Deliver structured 1-year and 2-year learning programs
- Replace offline coaching workflows with a digital-first platform
- Support both live and recorded learning experiences
- Use AI for doubt solving, quiz generation, and personalized guidance
- Improve revision with shorts-form educational videos
- Provide full operational control through an admin-managed system

## 3. Feature Summary

| Area | Description |
| --- | --- |
| Student Dashboard | Personalized dashboard with progress tracking and performance insights |
| Structured Courses | Long-term course plans with syllabus and timelines |
| Live Classes | Teacher-led real-time online sessions |
| Recorded Lectures | Auto-saved sessions available after live class completion |
| Shorts | Short topic-based videos for quick revision |
| Study Materials | PDFs, notes, and downloadable learning resources |
| AI Doubt Solver | Text and image-based question solving with guided explanations |
| AI Quizzes | Daily AI-generated assessments |
| Weekly Exams | Scheduled evaluation workflow |
| Live Chat Support | Student-teacher communication channel |
| Payments | Secure course purchase and subscription handling |
| Progress Analytics | Tracking for completion, performance, and engagement |

## 4. Roles and Responsibilities

### Student

Purpose: provide a complete and structured learning experience.

Responsibilities and capabilities:

- Register and log in
- Purchase course plans
- Access syllabus-based learning modules
- Join live classes
- Rewatch recorded lectures
- Use shorts for revision
- Download notes and PDFs
- Ask doubts through AI using text or images
- Attempt daily quizzes and weekly exams
- Track progress and performance

### Teacher

Purpose: conduct classes, publish learning content, and assess students.

Responsibilities and capabilities:

- Conduct live classes
- Support interactive real-time learning
- Rely on auto-recording for session archive
- Upload notes, PDFs, and assignments
- Create short-form revision videos
- Create weekly or custom tests
- Track student performance and weak areas

### Admin

Purpose: act as the central manager with full platform control.

Responsibilities and capabilities:

- Manage students and teachers
- Assign roles and permissions
- Approve and manage courses
- Monitor live, recorded, and short-form content
- Track payments, subscriptions, refunds, and revenue
- Monitor platform analytics and engagement
- Oversee AI usage and system quality

## 5. Functional Modules

### 5.1 Student Module

- Course enrollment and access control
- Dashboard with completion and analytics
- Live class attendance
- Recorded lecture access
- Shorts browsing and playback
- Study material browsing and downloads
- AI doubt solving
- AI-generated quizzes
- Weekly test participation

### 5.2 Teacher Module

- Live class scheduling and delivery
- Automatic session recording lifecycle
- Shorts creation and publishing
- Content management for notes and assignments
- Test creation and assignment
- Student monitoring and reporting

### 5.3 Admin Module

- User management
- Course approval and oversight
- Class and content quality monitoring
- Payment and subscription management
- AI operations monitoring
- Platform-wide reporting

## 6. Core User Flow

```text
Student
  -> Register / Login
  -> Purchase Course
  -> Access Dashboard
  -> Attend Live Class
  -> Watch Recorded Lecture
  -> Use Shorts for Revision
  -> Review Study Materials
  -> Ask AI Doubts
  -> Take Daily Quiz
  -> Take Weekly Test
  -> View Performance Tracking
  -> Receive Improvement Suggestions
```

## 7. Suggested Technical Architecture

| Layer | Technology |
| --- | --- |
| Frontend | React.js, Tailwind CSS |
| Backend | Ruby on Rails |
| Database | PostgreSQL |
| Authentication | JWT |
| AI Layer | Large Language Models |
| Payment Gateway | Razorpay or Stripe |
| Video Storage | AWS or Firebase |
| Real-time Features | WebSockets |

## 8. Data Model Overview

### Primary Entities

- Users
- Courses
- Classes
- RecordedLectures
- ShortsVideos
- StudyMaterials
- Tests
- Results
- Payments
- AIQueries

### Role Modeling

`Users` should support role-based access:

- `student`
- `teacher`
- `admin`

### High-Level Relationships

- One admin manages many users and courses
- One teacher owns many classes and can be linked to many courses
- One course has many students
- One class generates one recorded lecture
- One student has many payments
- One student has many test results
- One course contains live classes, recorded lectures, shorts, study materials, and tests

## 9. Recommended Domain Associations

### User Associations

- A student can enroll in multiple courses
- A student can attend many live classes
- A student can watch many recorded lectures and shorts

### Teacher Associations

- A teacher can belong to multiple courses
- A teacher can conduct multiple live classes
- A teacher can create multiple shorts

### Admin Associations

- Admin has platform-wide access
- Admin manages teachers, students, courses, payments, and AI systems

### Payment Associations

- A student can have multiple payments
- Each payment maps to a course purchase or subscription

### AI Associations

- Students use AI for doubt solving
- Students use AI for image-based question solving
- The platform uses AI for quiz generation
- Teachers may indirectly use AI outputs for student evaluation workflows

## 10. Security and Privacy Requirements

- JWT-based authentication
- Role-based access control for student, teacher, and admin
- Secure payment gateway integration
- Encrypted storage for sensitive user data
- Protected access to videos and documents

## 11. Reporting and Analytics

### Student Analytics

- Test performance trends
- Course progress tracking
- AI interaction history

### Teacher Analytics

- Class attendance
- Student performance summaries
- Content engagement metrics

### Admin Analytics

- Revenue reporting
- Course popularity
- Active user counts
- Platform engagement metrics

## 12. Future Enhancements

- Mobile apps for Android and iOS
- AI-personalized learning roadmap
- Voice-based AI tutor
- Gamification with badges and rewards
- Offline lecture downloads
- AI-generated class summaries

## 13. Developer Notes

### Implementation Priorities

1. Authentication and role-based authorization
2. Course enrollment and access management
3. Live class and recording pipeline
4. Content publishing for lectures, shorts, and study materials
5. Quiz, test, and result workflows
6. AI doubt solver and quiz generation
7. Payments and subscription lifecycle
8. Analytics and admin reporting

### Backend Concerns

- Keep course access rules centralized
- Model recordings and shorts separately to avoid mixing learning formats
- Treat AI queries as auditable events
- Record payment status transitions for refunds and reconciliation
- Gate all admin actions with strict authorization checks

### Frontend Concerns

- Build separate dashboards per role
- Surface progress and next actions clearly on the student home screen
- Keep teacher workflows optimized for repeated publishing tasks
- Expose admin analytics with filters for users, courses, and revenue

## 14. Conclusion

EduMentor AI is a full-stack digital learning platform that combines structured courses, live instruction, recorded content, revision shorts, AI-assisted learning, and centralized administration. This document can be used as a starting point for implementation planning, schema design, API scoping, and feature breakdown.
