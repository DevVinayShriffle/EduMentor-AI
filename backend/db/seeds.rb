# db/seeds.rb

require 'securerandom'
require 'faker'

puts "🌱 Seeding started..."

# Reset Faker unique generator (important for reseeding)
Faker::UniqueGenerator.clear

# -------------------------------
# Helpers
# -------------------------------
def create_user!(attrs)
  user = User.find_or_initialize_by(phone_number: attrs[:phone_number])
  user.assign_attributes(attrs)
  user.save!
  user
end

def random_phone(prefix)
  "#{prefix}#{rand(100000000..999999999)}"
end

# -------------------------------
# 1. Admin (role-based, no email dependency)
# -------------------------------
admin = User.find_by(role: :admin)

unless admin
  admin = create_user!(
    email: Faker::Internet.unique.email,
    password: "password",
    phone_number: "9000000000",
    role: :admin
  )
  puts "✅ Admin created"
else
  puts "ℹ️ Admin already exists"
end

# -------------------------------
# 2. Teachers (realistic)
# -------------------------------
teachers = 5.times.map do
  create_user!(
    email: Faker::Internet.unique.email,
    password: "password",
    phone_number: Faker::Number.unique.number(digits: 10).to_s,
    role: :teacher
  )
end

puts "✅ Teachers ready"

# -------------------------------
# 3. Courses (realistic titles + content)
# -------------------------------
courses = teachers.flat_map do |teacher|
  2.times.map do
    title = Faker::Educator.course_name

    course = Course.find_or_initialize_by(
      title: title,
      user_id: teacher.id
    )

    course.assign_attributes(
      description: Faker::Lorem.paragraph(sentence_count: 4),
      duration_type: Course.duration_types.keys.sample,
      status: :published
    )

    course.save!
    course
  end
end

puts "✅ Courses ready"

# -------------------------------
# 4. Students (realistic)
# -------------------------------
students = 10.times.map do
  create_user!(
    email: Faker::Internet.unique.email,
    password: "password",
    phone_number: Faker::Number.unique.number(digits: 10).to_s,
    role: :student
  )
end

puts "✅ Students ready"

# -------------------------------
# 5. Enrollments (2 per student)
# -------------------------------
students.each do |student|
  courses.sample(2).each do |course|
    Enrollment.find_or_create_by!(
      user_id: student.id,
      course_id: course.id
    ) do |enrollment|
      enrollment.status = :active
    end
  end
end

puts "✅ Enrollments ready"

puts "🎉 Seeding completed successfully!"