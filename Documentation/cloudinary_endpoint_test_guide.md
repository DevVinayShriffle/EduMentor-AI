# Cloudinary Endpoint Test Guide

This guide covers how to test all Cloudinary-related backend behavior from the Rails console in the `FEATURE-Cloudinary-backed-media-upload/delete` branch.

## Prerequisites

Make sure your `.env` contains:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Important:
- `CLOUDINARY_API_SECRET` is required
- if you wrote `CLOUDINARY_API_KEY` twice, fix that first

## Before Testing

From `backend/`:

```bash
bundle install
rails db:migrate
rails server
```

If needed, seed data:

```bash
rails db:seed
```

## Rails Console Setup

Open console:

```bash
rails console
```

Useful setup objects:

```ruby
teacher = User.find_by!(email: "teacher1@edumentorai.com")
course = Course.first || teacher.courses.first
syllabus = course.syllabus || course.create_syllabus!(title: "Demo Syllabus", status: :draft)
lesson = syllabus.lessons.first || syllabus.lessons.create!(
  title: "Demo Lesson",
  lesson_type: :concept,
  status: :draft,
  position: 1,
  estimated_duration_minutes: 30
)
```

If your seed emails are different, replace them with a real teacher/admin user from your DB.

## Console Tests To Run

### 1. Test Raw Cloudinary Upload Service

Pick a real local file path first.

Example:

```ruby
file = File.open("/absolute/path/to/banner.jpg")

result = CloudinaryService.upload(
  file: file,
  folder: "edumentor/manual-tests/banner"
)

puts result
file.close
```

Expected result:
- hash with `url`
- `public_id`
- `resource_type`

Verify:

```ruby
result[:url]
result[:public_id]
result[:resource_type]
```

### 2. Test Thumbnail Generation

Using the `result` from the previous step:

```ruby
thumb = CloudinaryService.thumbnail_variant(
  public_id: result[:public_id],
  resource_type: result[:resource_type]
)

puts thumb
```

Expected:
- image uploads return a thumbnail URL
- video uploads return a generated preview image URL
- raw/pdf style uploads may return `nil`

### 3. Simulate Course Banner Persistence

You can test the banner persistence logic directly in console:

```ruby
file = File.open("/absolute/path/to/banner.jpg")

upload_result = CloudinaryService.upload(
  file: file,
  folder: "edumentor/courses/#{course.id}/banner"
)

thumbnail_data = CloudinaryService.thumbnail_variant(
  public_id: upload_result[:public_id],
  resource_type: upload_result[:resource_type]
)

course.update!(
  banner_url: upload_result[:url],
  banner_public_id: upload_result[:public_id],
  thumbnail_url: thumbnail_data&.dig(:url)
)

file.close
course.reload
course.banner_url
course.banner_public_id
course.thumbnail_url
```

Expected:
- all 3 fields are populated
- URLs point to Cloudinary

### 4. Create a Course-Level Media File Manually

```ruby
file = File.open("/absolute/path/to/course-intro.mp4")

upload_result = CloudinaryService.upload(
  file: file,
  folder: "edumentor/courses/#{course.id}/media_files"
)

thumbnail_data = CloudinaryService.thumbnail_variant(
  public_id: upload_result[:public_id],
  resource_type: upload_result[:resource_type],
  width: 320,
  height: 180
)

media = course.media_files.create!(
  user: teacher,
  title: "Course Intro Video",
  description: "Manual console upload test",
  file_type: :video,
  provider: :cloudinary,
  status: :published,
  position: 1,
  duration_seconds: 120,
  resource_type: upload_result[:resource_type],
  file_url: upload_result[:url],
  public_id: upload_result[:public_id],
  thumbnail_url: thumbnail_data&.dig(:url),
  free_preview: true
)

file.close
media
```

Verify:

```ruby
media.file_url
media.public_id
media.resource_type
media.thumbnail_url
media.mediable
```

### 5. Create a Lesson-Level Media File Manually

```ruby
file = File.open("/absolute/path/to/lesson-notes.pdf")

upload_result = CloudinaryService.upload(
  file: file,
  folder: "edumentor/courses/#{lesson.syllabus.course_id}/lessons/#{lesson.id}/media_files"
)

thumbnail_data = CloudinaryService.thumbnail_variant(
  public_id: upload_result[:public_id],
  resource_type: upload_result[:resource_type],
  width: 320,
  height: 180
)

media = lesson.media_files.create!(
  user: teacher,
  title: "Lesson Notes",
  description: "Manual console upload test",
  file_type: :pdf,
  provider: :cloudinary,
  status: :published,
  position: 1,
  duration_seconds: 0,
  resource_type: upload_result[:resource_type],
  file_url: upload_result[:url],
  public_id: upload_result[:public_id],
  thumbnail_url: thumbnail_data&.dig(:url),
  free_preview: false
)

file.close
media
```

Verify:

```ruby
media.mediable
media.mediable_type
media.file_url
```

### 6. Inspect Saved Media Records

```ruby
MediaFile.order(created_at: :desc).limit(5).map do |m|
  {
    id: m.id,
    title: m.title,
    provider: m.provider,
    file_url: m.file_url,
    public_id: m.public_id,
    resource_type: m.resource_type,
    thumbnail_url: m.thumbnail_url,
    mediable_type: m.mediable_type,
    mediable_id: m.mediable_id
  }
end
```

### 7. Replace an Existing Media File

```ruby
media = MediaFile.last
old_public_id = media.public_id
old_resource_type = media.resource_type

file = File.open("/absolute/path/to/replacement-file.jpg")

upload_result = CloudinaryService.upload(
  file: file,
  folder: if media.mediable.is_a?(Course)
            "edumentor/courses/#{media.mediable.id}/media_files"
          else
            "edumentor/courses/#{media.mediable.syllabus.course_id}/lessons/#{media.mediable.id}/media_files"
          end
)

thumbnail_data = CloudinaryService.thumbnail_variant(
  public_id: upload_result[:public_id],
  resource_type: upload_result[:resource_type],
  width: 320,
  height: 180
)

media.update!(
  title: "#{media.title} Updated",
  file_type: :image,
  provider: :cloudinary,
  resource_type: upload_result[:resource_type],
  file_url: upload_result[:url],
  public_id: upload_result[:public_id],
  thumbnail_url: thumbnail_data&.dig(:url)
)

CloudinaryService.destroy(
  public_id: old_public_id,
  resource_type: old_resource_type
)

file.close
media.reload
media.public_id
```

Expected:
- `public_id` changes
- old Cloudinary asset gets deleted

### 8. Delete a Media File and Its Cloudinary Asset

Because `MediaFile` has a `before_destroy` callback, console deletion should also remove the Cloudinary asset.

```ruby
media = MediaFile.last
public_id = media.public_id
resource_type = media.resource_type

media.destroy!
```

Verify DB deletion:

```ruby
MediaFile.find_by(id: media.id)
```

Expected:
- returns `nil`

You can also manually check that the old asset URL is no longer usable in Cloudinary.

### 9. Delete a Course Banner Asset Manually

To verify `Course` cleanup logic:

```ruby
course = Course.find(course.id)
course.destroy!
```

Expected:
- course is deleted
- `before_destroy` should call `CloudinaryService.destroy` for `banner_public_id`

Use this only on throwaway test data.

## Suggested Console Test Order

1. Login
2. Open `rails console`
3. Upload a raw file with `CloudinaryService.upload`
4. Generate a thumbnail with `CloudinaryService.thumbnail_variant`
5. Persist banner fields to a course
6. Create a course media file
7. Create a lesson media file
8. Inspect saved records
9. Replace a media file
10. Delete a media file
11. Optionally destroy a throwaway course to verify banner cleanup

## DB Verification Commands

Check course:

```ruby
course = Course.find(1)
course.banner_url
course.banner_public_id
course.thumbnail_url
```

Check media file:

```ruby
media = MediaFile.last
media.file_url
media.public_id
media.resource_type
media.provider
media.thumbnail_url
media.mediable
```

## Common Problems

### Cloudinary credentials wrong

Symptoms:
- upload fails
- Cloudinary auth error

Fix:
- confirm `CLOUDINARY_CLOUD_NAME`
- confirm `CLOUDINARY_API_KEY`
- confirm `CLOUDINARY_API_SECRET`

### Upload works but no thumbnail

Possible reason:
- file type is not image or video
- thumbnail generation is intentionally skipped for unsupported resource types like raw documents

### Syllabus media confusion

Current design note:
- there is no direct `Syllabus has_many :media_files`
- syllabus-related files should currently be attached either to:
  - the parent course, or
  - an individual lesson

## Recommended Final Manual Checklist

- banner upload works
- course thumbnail auto-generates from banner upload
- course media Cloudinary record creation works
- lesson media Cloudinary record creation works
- media update replaces Cloudinary asset correctly
- media delete removes Cloudinary asset
- course destroy removes `banner_public_id` asset
