class CourseSerializer
  include JSONAPI::Serializer

  set_type :course

  attributes :id,
             :title,
             :description,
             :duration_type,
             :status,
             :price,
             :currency,
             :target_exam,
             :class_level,
             :language,
             :starts_on,
             :ends_on,
             :total_lessons,
             :total_tests,
             :featured,
             :thumbnail_url,
             :banner_url,
             :banner_public_id,
             :created_at,
             :updated_at

  attribute :teacher do |course|
    {
      id: course.teacher.id,
      email: course.teacher.email,
      phone_number: course.teacher.phone_number
    }
  end
end