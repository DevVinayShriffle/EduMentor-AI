class Syllabus < ApplicationRecord
  belongs_to :course
  has_many :lessons, dependent: :destroy

  enum :status, {draft: 0, published: 1, archived: 2}

  validates :title, presence: true
  validates :course_id, uniqueness: true
end
