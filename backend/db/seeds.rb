# frozen_string_literal: true

require "faker"

puts "Seeding EduMentor AI data..."

DEFAULT_PASSWORD = "password123".freeze
TEACHER_COUNT = 3
STUDENT_COUNT = 6
COURSE_COUNT = 5
LESSONS_PER_SYLLABUS = 5
COURSE_STATUSES = %i[published published published draft published].freeze
COURSE_DURATION_TYPES = %i[one_year two_year one_year two_year one_year].freeze
LESSON_MEDIA_BLUEPRINTS = [
  { suffix: "Recording", file_type: :video, resource_type: "video", extension: "mp4" },
  { suffix: "Notes", file_type: :note, resource_type: "raw", extension: "pdf" }
].freeze

USER_SEEDS = [
  { email: "admin@edumentorai.com", phone_number: "9000000000", role: :admin },
  { email: "teacher.math@edumentorai.com", phone_number: "9000000001", role: :teacher },
  { email: "teacher.science@edumentorai.com", phone_number: "9000000002", role: :teacher },
  { email: "teacher.language@edumentorai.com", phone_number: "9000000003", role: :teacher },
  { email: "student.one@edumentorai.com", phone_number: "9000000011", role: :student },
  { email: "student.two@edumentorai.com", phone_number: "9000000012", role: :student },
  { email: "student.three@edumentorai.com", phone_number: "9000000013", role: :student },
  { email: "student.four@edumentorai.com", phone_number: "9000000014", role: :student },
  { email: "student.five@edumentorai.com", phone_number: "9000000015", role: :student },
  { email: "student.six@edumentorai.com", phone_number: "9000000016", role: :student }
].freeze

LESSON_TITLES = [
  "Core Concepts",
  "Worked Examples",
  "Guided Practice",
  "Revision Sprint",
  "Test Discussion"
].freeze

LESSON_TYPES = [
  :concept,
  :practice,
  :practice,
  :revision,
  :test_discussion
].freeze

def phone_number_for(index)
  (9_100_000_000 + index).to_s
end

def teacher_profile(index)
  {
    email: "teacher#{index + 1}@edumentorai.com",
    phone_number: phone_number_for(100 + index),
    role: :teacher
  }
end

def student_profile(index)
  {
    email: "student#{index + 1}@edumentorai.com",
    phone_number: phone_number_for(200 + index),
    role: :student
  }
end

def course_title(subject:, exam:)
  [
    exam,
    subject,
    ["Mastery Program", "Structured Track", "Rank Booster", "Revision Path"].sample
  ].join(" ")
end

def course_description(subject:, exam:)
  Faker::Lorem.paragraph_by_chars(
    number: 180,
    supplemental: true
  ) + " Built for #{exam} learners with a strong focus on #{subject.downcase}, revision discipline, and measurable progress."
end

def create_or_update_user!(attributes)
  user = User.find_or_initialize_by(email: attributes.fetch(:email))
  user.assign_attributes(
    phone_number: attributes.fetch(:phone_number),
    role: attributes.fetch(:role),
    password: DEFAULT_PASSWORD,
    password_confirmation: DEFAULT_PASSWORD
  )
  user.save!
  user
end

def create_or_update_media_file!(owner:, uploader:, attributes:)
  media_file = owner.media_files.find_or_initialize_by(title: attributes.fetch(:title))
  media_file.assign_attributes(attributes.except(:title))
  media_file.title = attributes.fetch(:title)
  media_file.user = uploader
  media_file.save!
  media_file
end

def slugify(text)
  text.downcase.gsub(/[^a-z0-9]+/, "-").gsub(/^-|-$/, "")
end

Faker::Config.random = Random.new(42)

teacher_seed_profiles = Array.new(TEACHER_COUNT) { |index| teacher_profile(index) }
student_seed_profiles = Array.new(STUDENT_COUNT) { |index| student_profile(index) }

users_by_email = (USER_SEEDS + teacher_seed_profiles + student_seed_profiles).uniq { |entry| entry[:email] }.each_with_object({}) do |user_seed, memo|
  memo[user_seed.fetch(:email)] = create_or_update_user!(user_seed)
end

puts "Users ready: #{User.count}"

teacher_pool = users_by_email.values.select(&:teacher?).sort_by(&:email)

subject_exam_pairs = [
  ["Mathematics", "JEE Main"],
  ["Biology", "NEET"],
  ["Physics", "JEE Advanced"],
  ["English", "State Boards"],
  ["Chemistry", "NEET"]
].freeze

courses = subject_exam_pairs.first(COURSE_COUNT).map.with_index(1) do |(subject, exam), course_index|
  teacher = teacher_pool[(course_index - 1) % teacher_pool.length]
  title = course_title(subject:, exam:)
  course = Course.find_or_initialize_by(
    title: title,
    user_id: teacher.id
  )

  course.assign_attributes(
    description: course_description(subject:, exam:),
    duration_type: COURSE_DURATION_TYPES.fetch(course_index - 1),
    status: COURSE_STATUSES.fetch(course_index - 1)
  )
  course.save!

  syllabus = course.syllabus || course.build_syllabus
  syllabus.assign_attributes(
    title: "#{title} Syllabus",
    description: "#{Faker::Educator.course_name} module map with concept flow, practice layers, and revision checkpoints for #{subject.downcase}.",
    status: :published
  )
  syllabus.save!

  course_slug = slugify(title)

  create_or_update_media_file!(
    owner: course,
    uploader: teacher,
    attributes: {
      title: "#{title} Intro Video",
      description: Faker::Marketing.buzzwords + " overview video for the course.",
      file_type: :video,
      provider: :cloudinary,
      status: :published,
      position: 1,
      duration_seconds: 180 + (course_index * 15),
      resource_type: "video",
      file_url: "https://res.cloudinary.com/demo/video/upload/v1/edumentor/#{course_slug}-intro.mp4",
      public_id: "edumentor/#{course_slug}-intro",
      thumbnail_url: "https://res.cloudinary.com/demo/image/upload/v1/edumentor/#{course_slug}-intro.jpg",
      free_preview: true
    }
  )

  create_or_update_media_file!(
    owner: course,
    uploader: teacher,
    attributes: {
      title: "#{title} Brochure",
      description: "Downloadable course outline and learner guidance PDF for #{title}.",
      file_type: :pdf,
      provider: :cloudinary,
      status: :published,
      position: 2,
      duration_seconds: 0,
      resource_type: "raw",
      file_url: "https://res.cloudinary.com/demo/raw/upload/v1/edumentor/#{course_slug}-brochure.pdf",
      public_id: "edumentor/#{course_slug}-brochure",
      thumbnail_url: nil,
      free_preview: true
    }
  )

  LESSONS_PER_SYLLABUS.times do |lesson_index|
    lesson_number = lesson_index + 1
    lesson = syllabus.lessons.find_or_initialize_by(position: lesson_number)
    lesson.assign_attributes(
      title: "#{subject} #{LESSON_TITLES.fetch(lesson_index)}",
      description: "Lesson #{lesson_number}: #{Faker::Lorem.sentence(word_count: 14)}",
      lesson_type: LESSON_TYPES.fetch(lesson_index),
      status: lesson_number == LESSONS_PER_SYLLABUS ? :draft : :published,
      estimated_duration_minutes: 45 + (lesson_number * 10)
    )
    lesson.save!

    lesson_slug = "#{course_slug}-lesson-#{lesson_number}"

    LESSON_MEDIA_BLUEPRINTS.each_with_index do |media_blueprint, media_index|
      create_or_update_media_file!(
        owner: lesson,
        uploader: teacher,
        attributes: {
          title: "#{lesson.title} #{media_blueprint.fetch(:suffix)}",
          description: "#{Faker::Lorem.sentence(word_count: 10)} for #{lesson.title}.",
          file_type: media_blueprint.fetch(:file_type),
          provider: :cloudinary,
          status: :published,
          position: media_index + 1,
          duration_seconds: media_blueprint[:file_type] == :video ? 2400 + (lesson_number * 300) : 0,
          resource_type: media_blueprint.fetch(:resource_type),
          file_url: "https://res.cloudinary.com/demo/#{media_blueprint.fetch(:resource_type)}/upload/v1/edumentor/#{lesson_slug}-#{media_blueprint.fetch(:suffix).downcase}.#{media_blueprint.fetch(:extension)}",
          public_id: "edumentor/#{lesson_slug}-#{media_blueprint.fetch(:suffix).downcase}",
          thumbnail_url: media_blueprint[:file_type] == :video ? "https://res.cloudinary.com/demo/image/upload/v1/edumentor/#{lesson_slug}-recording.jpg" : nil,
          free_preview: media_index.zero? && lesson_number == 1
        }
      )
    end
  end

  course
end

puts "Courses ready: #{Course.count}"
puts "Syllabuses ready: #{Syllabus.count}"
puts "Lessons ready: #{Lesson.count}"
puts "Media files ready: #{MediaFile.count}"

students = users_by_email.values.select(&:student?)

students.each_with_index do |student, index|
  courses_to_assign = courses.rotate(index).first(2)

  courses_to_assign.each do |course|
    enrollment = Enrollment.find_or_initialize_by(user: student, course: course)
    enrollment.status = :active
    enrollment.save!
  end
end

puts "Enrollments ready: #{Enrollment.count}"
puts "Seeding completed successfully."
