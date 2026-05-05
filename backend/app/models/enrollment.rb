class Enrollment < ApplicationRecord
  belongs_to :user
  belongs_to :course

  enum :status, { active: 0, cancelled: 1 }

  validates :user_id, uniqueness: { scope: :course_id }

  scope :active, -> { where(status: :active) }
end