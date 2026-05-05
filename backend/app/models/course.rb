class Course < ApplicationRecord
  belongs_to :teacher, class_name: "User", foreign_key: :user_id

  enum :status, { draft: 0, published: 1, archived: 2 }
  enum :duration_type, { one_year: 0, two_year: 1 }

  validates :title, presence: true
  validates :duration_type, presence: true
  validates :status, presence: true
  validates :description, presence: true

  has_many :enrollments
  has_many :students, through: :enrollments, source: :user
end