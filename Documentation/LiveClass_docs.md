# EduMentor AI — Live Class Module Documentation

## 1. Purpose

The Live Class module allows a teacher to schedule and conduct online classes inside the EduMentor AI platform.

The video meeting itself is handled by Jitsi, but EduMentor AI controls:

- who can create a class
- who can start/end the class
- who can join the class
- attendance tracking
- course/lesson connection
- recording metadata later
- custom platform UI like chat, AI doubt solver, notes, and controls

Basic flow:

```text
Teacher schedules LiveClass
→ scheduled time comes
→ teacher clicks Start Class
→ class status becomes live
→ students join inside EduMentor UI
→ attendance is tracked
→ teacher ends class
→ class status becomes ended
→ recording can be stored later as MediaFile
```

---

## 2. Recommended Entity Structure

```text
Course
  has_one Syllabus
  has_many LiveClasses

Lesson
  belongs_to Syllabus
  has_many LiveClasses

LiveClass
  belongs_to Course
  optionally belongs_to Lesson
  belongs_to Teacher/User
  has_many LiveClassAttendances
  has_many MediaFiles as mediable

LiveClassAttendance
  belongs_to LiveClass
  belongs_to User
```

A live class can be attached directly to a course, and optionally to a specific lesson.

Example:

```text
Course: JEE 2-Year Plan
Lesson: Kinematics Basics
LiveClass: Kinematics Live Problem Solving Session
```

---

## 3. LiveClass Migration

Create the model:

```bash
bin/rails generate model LiveClass course:references lesson:references teacher:references title:string description:text scheduled_start_time:datetime scheduled_end_time:datetime started_at:datetime ended_at:datetime status:integer room_name:string meeting_provider:string recording_enabled:boolean
```

Then edit the migration manually:

```ruby
class CreateLiveClasses < ActiveRecord::Migration[8.1]
  def change
    create_table :live_classes do |t|
      t.references :course, null: false, foreign_key: true
      t.references :lesson, foreign_key: true
      t.references :teacher, null: false, foreign_key: { to_table: :users }

      t.string :title, null: false
      t.text :description

      t.datetime :scheduled_start_time, null: false
      t.datetime :scheduled_end_time

      t.datetime :started_at
      t.datetime :ended_at

      t.integer :status, default: 0, null: false

      t.string :room_name, null: false
      t.string :meeting_provider, default: "jitsi", null: false

      t.boolean :recording_enabled, default: true, null: false

      t.timestamps
    end

    add_index :live_classes, :room_name, unique: true
    add_index :live_classes, [:course_id, :scheduled_start_time]
    add_index :live_classes, [:teacher_id, :scheduled_start_time]
  end
end
```

### Field explanation

| Field | Purpose |
| --- | --- |
| `course_id` | The course this live class belongs to |
| `lesson_id` | Optional lesson connection |
| `teacher_id` | Teacher conducting the class |
| `title` | Class title |
| `description` | Class details |
| `scheduled_start_time` | Planned start time |
| `scheduled_end_time` | Planned end time |
| `started_at` | Actual start time |
| `ended_at` | Actual end time |
| `status` | scheduled/live/ended/cancelled |
| `room_name` | Unique Jitsi meeting room name |
| `meeting_provider` | jitsi, jaas, zoom, etc. |
| `recording_enabled` | Whether recording should be enabled |

---

## 4. LiveClassAttendance Migration

Create the model:

```bash
bin/rails generate model LiveClassAttendance live_class:references user:references joined_at:datetime left_at:datetime duration_seconds:integer
```

Edit migration:

```ruby
class CreateLiveClassAttendances < ActiveRecord::Migration[8.1]
  def change
    create_table :live_class_attendances do |t|
      t.references :live_class, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.datetime :joined_at
      t.datetime :left_at
      t.integer :duration_seconds, default: 0, null: false

      t.timestamps
    end

    add_index :live_class_attendances, [:live_class_id, :user_id], unique: true
  end
end
```

### Why this table is needed

This table records which student joined which live class.

Useful for:

- attendance tracking
- teacher reports
- student analytics
- admin analytics
- progress tracking

---

## 5. LiveClass Model

```ruby
class LiveClass < ApplicationRecord
  belongs_to :course
  belongs_to :lesson, optional: true
  belongs_to :teacher, class_name: "User"

  has_many :live_class_attendances, dependent: :destroy
  has_many :attendees, through: :live_class_attendances, source: :user
  has_many :media_files, as: :mediable, dependent: :destroy

  enum :status, {
    scheduled: 0,
    live: 1,
    ended: 2,
    cancelled: 3
  }

  before_validation :generate_room_name, on: :create

  validates :title, presence: true
  validates :scheduled_start_time, presence: true
  validates :room_name, presence: true, uniqueness: true

  def meeting_url
    "https://meet.jit.si/#{room_name}"
  end

  private

  def generate_room_name
    return if room_name.present?

    self.room_name = [
      "edumentor",
      "course",
      course_id || "new",
      "class",
      SecureRandom.hex(8)
    ].join("-")
  end
end
```

### Important note about Jitsi URL generation

For normal Jitsi usage, the meeting is identified by the `room_name`.

Example:

```ruby
room_name = "edumentor-course-12-class-a91f3c8d44a0b722"
```

Meeting URL becomes:

```text
https://meet.jit.si/edumentor-course-12-class-a91f3c8d44a0b722
```

But for your app, students should not be redirected. React will embed Jitsi using:

```jsx
<JitsiMeeting
  domain="meet.jit.si"
  roomName={meetingData.room_name}
/>
```

So storing `room_name` is enough.

---

## 6. LiveClassAttendance Model

```ruby
class LiveClassAttendance < ApplicationRecord
  belongs_to :live_class
  belongs_to :user

  validates :user_id, uniqueness: { scope: :live_class_id }

  before_save :calculate_duration_seconds

  private

  def calculate_duration_seconds
    return unless joined_at.present? && left_at.present?

    self.duration_seconds = (left_at - joined_at).to_i
  end
end
```

---

## 7. Course Model Changes

Add:

```ruby
class Course < ApplicationRecord
  has_many :live_classes, dependent: :destroy
end
```

If courses already belong to a teacher/user:

```ruby
belongs_to :user
```

This can remain as-is.

---

## 8. Lesson Model Changes

Add:

```ruby
class Lesson < ApplicationRecord
  has_many :live_classes, dependent: :nullify
end
```

Use `dependent: :nullify` because if a lesson is deleted, you may still want to keep past live class history.

---

## 9. User Model Changes

Add teacher-created live classes:

```ruby
class User < ApplicationRecord
  has_many :teaching_live_classes,
           class_name: "LiveClass",
           foreign_key: :teacher_id,
           dependent: :destroy

  has_many :live_class_attendances, dependent: :destroy
  has_many :attended_live_classes,
           through: :live_class_attendances,
           source: :live_class
end
```

---

## 10. MediaFile Connection for Recordings

Since EduMentor AI already uses polymorphic `media_files`, live class recordings can be stored there.

Add this to `LiveClass`:

```ruby
has_many :media_files, as: :mediable, dependent: :destroy
```

Example recording:

```text
media_file.mediable_type = "LiveClass"
media_file.mediable_id = live_class.id
media_file.file_type = "video"
media_file.provider = "cloudinary"
media_file.file_url = recording_url
```

This means no separate `recordings` table is required initially.

---

## 11. Routes

Recommended routes:

```ruby
namespace :api do
  namespace :v1 do
    resources :live_classes do
      member do
        patch :start
        patch :end
        post :join
        post :leave
        patch :cancel
      end
    end
  end
end
```

This creates:

```text
POST   /api/v1/live_classes
GET    /api/v1/live_classes
GET    /api/v1/live_classes/:id
PATCH  /api/v1/live_classes/:id/start
PATCH  /api/v1/live_classes/:id/end
POST   /api/v1/live_classes/:id/join
POST   /api/v1/live_classes/:id/leave
PATCH  /api/v1/live_classes/:id/cancel
```

---

## 12. LiveClassesController Skeleton

```ruby
class Api::V1::LiveClassesController < ApplicationController
  before_action :set_live_class, only: [:show, :start, :end, :join, :leave, :cancel]

  def index
    authorize! :read, LiveClass

    live_classes = LiveClass.accessible_by(current_ability).order(scheduled_start_time: :asc)

    render json: {
      status: "success",
      data: live_classes
    }, status: :ok
  end

  def show
    authorize! :read, @live_class

    render json: {
      status: "success",
      data: @live_class
    }, status: :ok
  end

  def create
    live_class = LiveClass.new(live_class_params)
    live_class.teacher = current_user

    authorize! :create, live_class

    if live_class.save
      render json: {
        status: "success",
        message: "Live class scheduled successfully",
        data: live_class
      }, status: :created
    else
      render json: {
        status: "error",
        errors: live_class.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def start
    authorize! :start, @live_class

    @live_class.update!(
      status: :live,
      started_at: Time.current
    )

    render json: {
      status: "success",
      message: "Live class started",
      data: join_payload(@live_class)
    }, status: :ok
  end

  def end
    authorize! :end, @live_class

    @live_class.update!(
      status: :ended,
      ended_at: Time.current
    )

    render json: {
      status: "success",
      message: "Live class ended",
      data: @live_class
    }, status: :ok
  end

  def join
    authorize! :join, @live_class

    attendance = LiveClassAttendance.find_or_initialize_by(
      live_class: @live_class,
      user: current_user
    )

    attendance.joined_at ||= Time.current
    attendance.save!

    render json: {
      status: "success",
      message: "Joined live class",
      data: join_payload(@live_class)
    }, status: :ok
  end

  def leave
    authorize! :leave, @live_class

    attendance = LiveClassAttendance.find_by(
      live_class: @live_class,
      user: current_user
    )

    attendance&.update!(left_at: Time.current)

    render json: {
      status: "success",
      message: "Left live class"
    }, status: :ok
  end

  def cancel
    authorize! :cancel, @live_class

    @live_class.update!(status: :cancelled)

    render json: {
      status: "success",
      message: "Live class cancelled",
      data: @live_class
    }, status: :ok
  end

  private

  def set_live_class
    @live_class = LiveClass.find(params[:id])
  end

  def live_class_params
    params.require(:live_class).permit(
      :course_id,
      :lesson_id,
      :title,
      :description,
      :scheduled_start_time,
      :scheduled_end_time,
      :recording_enabled
    )
  end

  def join_payload(live_class)
    {
      id: live_class.id,
      title: live_class.title,
      room_name: live_class.room_name,
      domain: "meet.jit.si",
      meeting_provider: live_class.meeting_provider,
      display_name: current_user.profile&.full_name || current_user.email,
      email: current_user.email,
      role: current_user.role
    }
  end
end
```

---

## 13. CanCanCan Authorization

Add rules to `Ability`.

```ruby
class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    if user.admin?
      can :manage, :all

    elsif user.teacher?
      can :read, LiveClass, teacher_id: user.id
      can :create, LiveClass
      can :update, LiveClass, teacher_id: user.id
      can :destroy, LiveClass, teacher_id: user.id
      can :start, LiveClass, teacher_id: user.id
      can :end, LiveClass, teacher_id: user.id
      can :cancel, LiveClass, teacher_id: user.id

    elsif user.student?
      can :read, LiveClass do |live_class|
        user.enrollments.active.exists?(course_id: live_class.course_id)
      end

      can :join, LiveClass do |live_class|
        live_class.live? && user.enrollments.active.exists?(course_id: live_class.course_id)
      end

      can :leave, LiveClass do |live_class|
        user.enrollments.active.exists?(course_id: live_class.course_id)
      end
    end
  end
end
```

### Important

Student join rule should usually require:

```text
class is live
student is enrolled in the course
```

---

## 14. React/Jitsi Integration

Install Jitsi React SDK:

```bash
npm install @jitsi/react-sdk
```

Create a live class room component:

```jsx
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useEffect, useState } from "react";

export default function LiveClassRoom({ liveClassId }) {
  const [meetingData, setMeetingData] = useState(null);

  useEffect(() => {
    async function joinClass() {
      const token = localStorage.getItem("token");

      const response = await fetch(`/api/v1/live_classes/${liveClassId}/join`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setMeetingData(result.data);
    }

    joinClass();
  }, [liveClassId]);

  if (!meetingData) {
    return <div className="p-6">Joining live class...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid h-screen grid-cols-1 lg:grid-cols-[1fr_360px]">
        <div className="h-[65vh] lg:h-screen">
          <JitsiMeeting
            domain={meetingData.domain}
            roomName={meetingData.room_name}
            userInfo={{
              displayName: meetingData.display_name,
              email: meetingData.email,
            }}
            configOverwrite={{
              startWithAudioMuted: true,
              startWithVideoMuted: false,
              disableDeepLinking: true,
              prejoinPageEnabled: false,
            }}
            interfaceConfigOverwrite={{
              SHOW_JITSI_WATERMARK: false,
              SHOW_WATERMARK_FOR_GUESTS: false,
            }}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = "100%";
              iframeRef.style.width = "100%";
            }}
          />
        </div>

        <aside className="border-l border-white/10 bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">Live Class Tools</h2>

          <div className="mt-4 rounded-2xl bg-white/5 p-4">
            <h3 className="font-medium">Class Chat</h3>
            <p className="mt-2 text-sm text-slate-400">
              Custom platform chat goes here.
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-white/5 p-4">
            <h3 className="font-medium">AI Doubt Solver</h3>
            <p className="mt-2 text-sm text-slate-400">
              AI chatbot goes here.
            </p>
          </div>

          <div className="mt-4 rounded-2xl bg-white/5 p-4">
            <h3 className="font-medium">Notes</h3>
            <p className="mt-2 text-sm text-slate-400">
              Notes/resources go here.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
```

---

## 15. UI Flow

### Teacher flow

```text
Teacher dashboard
→ Live Classes
→ Create Live Class
→ Select course
→ Optional select lesson
→ Add title/description/date/time
→ Save
→ At scheduled time, click Start Class
→ Jitsi loads inside platform
→ End Class
```

### Student flow

```text
Student dashboard
→ My Courses
→ Upcoming Live Classes
→ Join Live Class
→ Backend checks enrollment
→ Jitsi opens inside EduMentor UI
→ Student uses platform chat/AI/notes beside video
```

---

## 16. MVP vs Production

### MVP

Use:

```text
meet.jit.si
room_name
no JWT
embedded React Jitsi SDK
```

This is enough for development and demo.

### Production

Use one of:

```text
JaaS by 8x8
Self-hosted Jitsi server
Daily.co / 100ms / Agora
```

For secure production Jitsi, use JWT-based meeting access.

Do not rely on public `meet.jit.si` for a serious paid learning platform.

---

## 17. Final Recommended Implementation Order

```text
1. Create LiveClass migration
2. Create LiveClassAttendance migration
3. Add LiveClass model
4. Add LiveClassAttendance model
5. Add associations in Course, Lesson, User
6. Add CanCanCan rules
7. Add LiveClassesController
8. Add routes
9. Test teacher create/start/end
10. Test student join/leave
11. Install @jitsi/react-sdk
12. Build LiveClassRoom page
13. Add custom chat sidebar
14. Add AI chatbot sidebar
15. Later store recordings in media_files
```
