class Course < ApplicationRecord
  # =========================
  # Associations
  # =========================
  belongs_to :teacher,
             class_name: "User",
             foreign_key: :user_id

  has_many :enrollments,
           dependent: :destroy

  has_many :students,
           through: :enrollments,
           source: :user

  # =========================
  # Enums
  # =========================
  enum :status, {
    draft: 0,
    published: 1,
    archived: 2
  }

  enum :duration_type, {
    one_year: 0,
    two_year: 1
  }

  # =========================
  # Validations
  # =========================
  validates :title, presence: true
  validates :description, presence: true
  validates :duration_type, presence: true
  validates :status, presence: true
end