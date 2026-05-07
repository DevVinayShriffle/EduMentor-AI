class Lesson < ApplicationRecord
  belongs_to :syllabus
  has_many :media_files, as: :mediable, dependent: :destroy

  enum :lesson_type, {concept: 0, practice: 1, revision: 2, test_discussion: 3, doubt_session: 4}
  enum :status, {draft: 0, published: 1, archived: 2}

  validates :title, presence: true
  validates :position, numericality: { greater_than_or_equal_to: 0 }
end
