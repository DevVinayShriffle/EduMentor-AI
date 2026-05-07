# EduMentor AI — Course Content Schema Plan

This document explains the recommended database migrations, model relationships, and schema changes for building a course content structure similar to large educational platforms.

The planned hierarchy is:

```text
Course
  has_one Syllabus

Syllabus
  belongs_to Course
  has_many Lessons

Lesson
  belongs_to Syllabus
  has_many MediaFiles

MediaFile
  belongs_to mediable polymorphically
  belongs_to User uploader
```

Important decision: **do not create a separate `videos` table right now**. Since the app already has a `media_files` table and the goal is to store videos on Cloudinary, use `media_files` for videos, PDFs, images, notes, assignments, and other uploaded resources.

---

## 1. Existing Current Tables

Current important tables:

```text
users
courses
enrollments
media_files
```

Current `media_files` table is tied directly to `courses`:

```ruby
course_id
user_id
file_url
public_id
resource_type
```

This limits media files to a course only. But for a real learning platform, videos usually belong to lessons, not directly to the course.

So we should convert `media_files` into a **polymorphic table**.

---

## 2. Final Desired Entity Structure

```text
User
  has_many Courses
  has_many MediaFiles

Course
  belongs_to User
  has_one Syllabus
  has_many MediaFiles, as: :mediable
  has_many Enrollments

Syllabus
  belongs_to Course
  has_many Lessons

Lesson
  belongs_to Syllabus
  has_many MediaFiles, as: :mediable

MediaFile
  belongs_to User
  belongs_to Mediable polymorphically
```

This allows:

```text
Course-level media:
- course thumbnail
- course banner
- promotional intro video
- course brochure PDF

Lesson-level media:
- recorded lecture videos
- short revision videos
- PDFs
- notes
- assignments
- worksheets
```

---

## 3. Course Changes

Your current `courses` table is very basic:

```ruby
title
description
duration_type
status
user_id
```

Recommended additional fields:

```ruby
thumbnail_url
banner_url
price
currency
target_exam
class_level
language
starts_on
ends_on
total_lessons
total_tests
featured
```

### Migration Command

```bash
bin/rails generate migration AddDetailsToCourses thumbnail_url:string banner_url:string price:decimal currency:string target_exam:string class_level:string language:string starts_on:date ends_on:date total_lessons:integer total_tests:integer featured:boolean
```

### Migration File

```ruby
class AddDetailsToCourses < ActiveRecord::Migration[8.1]
  def change
    add_column :courses, :thumbnail_url, :string
    add_column :courses, :banner_url, :string

    add_column :courses, :price, :decimal, precision: 10, scale: 2, default: 0, null: false
    add_column :courses, :currency, :string, default: "INR", null: false

    add_column :courses, :target_exam, :string
    add_column :courses, :class_level, :string
    add_column :courses, :language, :string

    add_column :courses, :starts_on, :date
    add_column :courses, :ends_on, :date

    add_column :courses, :total_lessons, :integer, default: 0, null: false
    add_column :courses, :total_tests, :integer, default: 0, null: false

    add_column :courses, :featured, :boolean, default: false, null: false
  end
end
```

### Course Model

```ruby
class Course < ApplicationRecord
  belongs_to :user

  has_one :syllabus, dependent: :destroy
  has_many :lessons, through: :syllabus

  has_many :enrollments, dependent: :destroy
  has_many :students, through: :enrollments, source: :user

  has_many :media_files, as: :mediable, dependent: :destroy

  enum :status, {
    draft: 0,
    published: 1,
    archived: 2
  }

  enum :duration_type, {
    one_month: 0,
    three_months: 1,
    six_months: 2,
    one_year: 3,
    two_years: 4,
    crash_course: 5
  }

  validates :title, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }
end
```

---

## 4. Syllabus Table

A course has exactly one syllabus.

### Why `course_id` should be unique

Because the relationship is:

```text
Course has_one Syllabus
```

So one course should not accidentally have multiple syllabuses.

### Migration Command

```bash
bin/rails generate model Syllabus course:references title:string description:text status:integer
```

### Migration File

```ruby
class CreateSyllabuses < ActiveRecord::Migration[8.1]
  def change
    create_table :syllabuses do |t|
      t.references :course, null: false, foreign_key: true, index: { unique: true }

      t.string :title, null: false
      t.text :description
      t.integer :status, default: 0, null: false

      t.timestamps
    end
  end
end
```

### Important Note About `position`

Do **not** add `position` to syllabus if each course has only one syllabus.

`position` is useful only when there are multiple records to order. Since `Course has_one Syllabus`, syllabus ordering is not needed.

### Syllabus Model

```ruby
class Syllabus < ApplicationRecord
  belongs_to :course
  has_many :lessons, dependent: :destroy

  enum :status, {
    draft: 0,
    published: 1,
    archived: 2
  }

  validates :title, presence: true
  validates :course_id, uniqueness: true
end
```

---

## 5. Lesson Table

A syllabus has many lessons.

Example:

```text
Syllabus: JEE 2-Year Roadmap
  Lesson 1: Basic Mathematics
  Lesson 2: Vectors
  Lesson 3: Kinematics
```

### Migration Command

```bash
bin/rails generate model Lesson syllabus:references title:string description:text lesson_type:integer status:integer position:integer estimated_duration_minutes:integer
```

### Migration File

```ruby
class CreateLessons < ActiveRecord::Migration[8.1]
  def change
    create_table :lessons do |t|
      t.references :syllabus, null: false, foreign_key: true

      t.string :title, null: false
      t.text :description

      t.integer :lesson_type, default: 0, null: false
      t.integer :status, default: 0, null: false
      t.integer :position, default: 0, null: false
      t.integer :estimated_duration_minutes, default: 0, null: false

      t.timestamps
    end

    add_index :lessons, [:syllabus_id, :position]
  end
end
```

### What Is `position`?

`position` means order number.

Example:

```text
position 1 = Introduction
position 2 = Basic Maths
position 3 = Algebra
position 4 = Calculus
```

This lets the frontend show lessons in the correct order.

### What Is `lesson_type`?

`lesson_type` tells what kind of lesson it is.

Example:

```ruby
enum :lesson_type, {
  concept: 0,
  practice: 1,
  revision: 2,
  test_discussion: 3,
  doubt_session: 4
}
```

### Lesson Model

```ruby
class Lesson < ApplicationRecord
  belongs_to :syllabus
  has_many :media_files, as: :mediable, dependent: :destroy

  enum :lesson_type, {
    concept: 0,
    practice: 1,
    revision: 2,
    test_discussion: 3,
    doubt_session: 4
  }

  enum :status, {
    draft: 0,
    published: 1,
    archived: 2
  }

  validates :title, presence: true
  validates :position, numericality: { greater_than_or_equal_to: 0 }
end
```

---

## 6. Media Files Polymorphic Change

Do not create a separate `videos` table right now.

Use `media_files` for:

```text
videos
PDFs
images
notes
assignments
documents
thumbnails
banners
```

### Why Polymorphic?

Because a media file may belong to different models:

```text
Course media file
Lesson media file
Future: Test media file
Future: Doubt media file
```

Instead of hardcoding only `course_id`, polymorphic fields allow:

```ruby
mediable_type: "Lesson"
mediable_id: 10
```

or:

```ruby
mediable_type: "Course"
mediable_id: 3
```

---

## 7. Convert Existing MediaFiles To Polymorphic

Current `media_files` table has:

```ruby
course_id
user_id
file_url
public_id
resource_type
```

Recommended final columns:

```ruby
mediable_type
mediable_id
user_id
title
description
file_url
thumbnail_url
public_id
resource_type
file_type
provider
position
duration_seconds
status
free_preview
```

### Migration Command

```bash
bin/rails generate migration MakeMediaFilesPolymorphic
```

### Migration File

```ruby
class MakeMediaFilesPolymorphic < ActiveRecord::Migration[8.1]
  def change
    remove_reference :media_files, :course, foreign_key: true

    add_reference :media_files, :mediable, polymorphic: true, null: false

    add_column :media_files, :title, :string
    add_column :media_files, :description, :text
    add_column :media_files, :thumbnail_url, :string

    add_column :media_files, :file_type, :integer, default: 0, null: false
    add_column :media_files, :provider, :integer, default: 0, null: false
    add_column :media_files, :position, :integer, default: 0, null: false
    add_column :media_files, :duration_seconds, :integer, default: 0, null: false
    add_column :media_files, :status, :integer, default: 0, null: false
    add_column :media_files, :free_preview, :boolean, default: false, null: false

    add_index :media_files, [:mediable_type, :mediable_id, :position]
  end
end
```

### Important Warning

If you already have real `media_files` records in the database, the above migration may fail because `mediable` is added as `null: false` after removing `course_id`.

For real existing data, use a safer two-step migration:

```ruby
class MakeMediaFilesPolymorphic < ActiveRecord::Migration[8.1]
  def up
    add_column :media_files, :mediable_type, :string
    add_column :media_files, :mediable_id, :bigint

    MediaFile.reset_column_information

    MediaFile.find_each do |media_file|
      media_file.update_columns(
        mediable_type: "Course",
        mediable_id: media_file.course_id
      )
    end

    change_column_null :media_files, :mediable_type, false
    change_column_null :media_files, :mediable_id, false

    remove_reference :media_files, :course, foreign_key: true

    add_column :media_files, :title, :string
    add_column :media_files, :description, :text
    add_column :media_files, :thumbnail_url, :string

    add_column :media_files, :file_type, :integer, default: 0, null: false
    add_column :media_files, :provider, :integer, default: 0, null: false
    add_column :media_files, :position, :integer, default: 0, null: false
    add_column :media_files, :duration_seconds, :integer, default: 0, null: false
    add_column :media_files, :status, :integer, default: 0, null: false
    add_column :media_files, :free_preview, :boolean, default: false, null: false

    add_index :media_files, [:mediable_type, :mediable_id]
    add_index :media_files, [:mediable_type, :mediable_id, :position]
  end

  def down
    add_reference :media_files, :course, foreign_key: true

    MediaFile.reset_column_information

    MediaFile.where(mediable_type: "Course").find_each do |media_file|
      media_file.update_columns(course_id: media_file.mediable_id)
    end

    change_column_null :media_files, :course_id, false

    remove_index :media_files, [:mediable_type, :mediable_id, :position]
    remove_index :media_files, [:mediable_type, :mediable_id]

    remove_column :media_files, :mediable_type
    remove_column :media_files, :mediable_id

    remove_column :media_files, :title
    remove_column :media_files, :description
    remove_column :media_files, :thumbnail_url
    remove_column :media_files, :file_type
    remove_column :media_files, :provider
    remove_column :media_files, :position
    remove_column :media_files, :duration_seconds
    remove_column :media_files, :status
    remove_column :media_files, :free_preview
  end
end
```

Use the simple migration only if this is still early development and you do not care about existing `media_files` data.

---

## 8. MediaFile Model

```ruby
class MediaFile < ApplicationRecord
  belongs_to :mediable, polymorphic: true
  belongs_to :user

  enum :file_type, {
    video: 0,
    pdf: 1,
    image: 2,
    document: 3,
    assignment: 4,
    note: 5
  }

  enum :provider, {
    cloudinary: 0,
    youtube: 1,
    vimeo: 2,
    aws_s3: 3
  }

  enum :status, {
    draft: 0,
    processing: 1,
    published: 2,
    failed: 3,
    archived: 4
  }

  validates :file_url, presence: true
  validates :public_id, presence: true, if: :cloudinary?
  validates :position, numericality: { greater_than_or_equal_to: 0 }
end
```

### What Is `file_type`?

It says what kind of file this record is:

```text
video
pdf
image
document
assignment
note
```

### What Is `provider`?

It says where the file is stored:

```text
cloudinary
youtube
vimeo
aws_s3
```

For Cloudinary videos:

```ruby
file_type: :video
provider: :cloudinary
resource_type: "video"
```

---

## 9. User Model Changes

```ruby
class User < ApplicationRecord
  has_one :profile, dependent: :destroy

  has_many :courses, dependent: :destroy
  has_many :enrollments, dependent: :destroy
  has_many :media_files, dependent: :destroy

  after_create :create_default_profile

  private

  def create_default_profile
    create_profile!
  end
end
```

Keep your existing Devise/JWT/role logic as it is.

---

## 10. Final Model Associations Summary

### Course

```ruby
class Course < ApplicationRecord
  belongs_to :user

  has_one :syllabus, dependent: :destroy
  has_many :lessons, through: :syllabus

  has_many :enrollments, dependent: :destroy
  has_many :students, through: :enrollments, source: :user

  has_many :media_files, as: :mediable, dependent: :destroy
end
```

### Syllabus

```ruby
class Syllabus < ApplicationRecord
  belongs_to :course
  has_many :lessons, dependent: :destroy
end
```

### Lesson

```ruby
class Lesson < ApplicationRecord
  belongs_to :syllabus
  has_many :media_files, as: :mediable, dependent: :destroy
end
```

### MediaFile

```ruby
class MediaFile < ApplicationRecord
  belongs_to :mediable, polymorphic: true
  belongs_to :user
end
```

---

## 11. Example Usage

### Create syllabus for a course

```ruby
course = Course.find(1)
course.create_syllabus!(
  title: "Complete JEE Syllabus",
  description: "Full roadmap for JEE preparation",
  status: :published
)
```

### Create lesson under syllabus

```ruby
lesson = course.syllabus.lessons.create!(
  title: "Basic Mathematics",
  description: "Foundation concepts for JEE maths",
  lesson_type: :concept,
  status: :published,
  position: 1,
  estimated_duration_minutes: 60
)
```

### Attach Cloudinary video to lesson

```ruby
lesson.media_files.create!(
  user: teacher,
  title: "Introduction to Basic Mathematics",
  description: "Opening lecture for the Basic Mathematics lesson",
  file_url: "https://res.cloudinary.com/demo/video/upload/example.mp4",
  public_id: "courses/jee/basic-maths/intro-video",
  resource_type: "video",
  file_type: :video,
  provider: :cloudinary,
  status: :published,
  position: 1,
  duration_seconds: 1800,
  free_preview: true
)
```

### Attach PDF notes to lesson

```ruby
lesson.media_files.create!(
  user: teacher,
  title: "Basic Mathematics Notes",
  file_url: "https://res.cloudinary.com/demo/raw/upload/basic-maths.pdf",
  public_id: "courses/jee/basic-maths/notes-pdf",
  resource_type: "raw",
  file_type: :pdf,
  provider: :cloudinary,
  status: :published,
  position: 2
)
```

---

## 12. Recommended API Nesting

Use nested routes like this:

```ruby
namespace :api do
  namespace :v1 do
    resources :courses do
      resource :syllabus, only: [:show, :create, :update, :destroy]

      resources :lessons, only: [:index, :show, :create, :update, :destroy] do
        resources :media_files, only: [:index, :show, :create, :update, :destroy]
      end
    end
  end
end
```

Note: `resource :syllabus` is singular because course has one syllabus.

---

## 13. CanCanCan Authorization Ideas

### Admin

```ruby
can :manage, :all
```

### Teacher

```ruby
can :manage, Course, user_id: user.id
can :manage, Syllabus, course: { user_id: user.id }
can :manage, Lesson, syllabus: { course: { user_id: user.id } }
can :manage, MediaFile, user_id: user.id
```

### Student

```ruby
can :read, Course, status: "published"
can :read, Syllabus, course: { status: "published" }
can :read, Lesson, syllabus: { course: { status: "published" } }
can :read, MediaFile, status: "published"
```

For stricter course access, check enrollment before allowing lesson/media access.

---

## 14. Implementation Order

Recommended safe order:

```text
1. Add course details migration
2. Create syllabuses table
3. Create lessons table
4. Convert media_files to polymorphic
5. Update model associations
6. Update CanCanCan abilities
7. Add controllers/routes
8. Add serializers/JSON responses
9. Test with sample data
```

---

## 15. Final Decision

Use this final structure:

```text
Course
  has_one Syllabus

Syllabus
  has_many Lessons

Lesson
  has_many MediaFiles

MediaFile
  stores Cloudinary videos, PDFs, images, notes, assignments
```

Do not create `Video` model yet.

Use `MediaFile` with:

```ruby
file_type: :video
provider: :cloudinary
resource_type: "video"
```

This is flexible, scalable, and avoids duplicate upload-related tables.
