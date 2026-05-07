class Course < ApplicationRecord
  belongs_to :teacher, class_name: "User", foreign_key: :user_id

  has_many :enrollments, dependent: :destroy
  has_many :students, through: :enrollments, source: :user
  has_one :syllabus, dependent: :destroy
  has_many :lessons, through: :syllabus
  has_many :media_files, as: :mediable, dependent: :destroy

  before_destroy :remove_cloudinary_assets

  has_many :enrollments,
           dependent: :destroy

  has_many :students,
           through: :enrollments,
           source: :user

  # =========================
  # Callbacks
  # =========================
  before_destroy :remove_cloudinary_assets

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
  validates :description, presence: true
  validates :duration_type, presence: true
  validates :status, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }

  private

  def remove_cloudinary_assets
    return if banner_public_id.blank?

    CloudinaryService.destroy(public_id: banner_public_id)
  end
end
