class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  enum :role, { student: 0, teacher: 1, admin: 2 }

  validates :phone_number, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true

  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: self

  has_many :courses,
           foreign_key: :user_id,
           dependent: :destroy

  has_many :enrollments,
           dependent: :destroy
  has_many :enrolled_courses,
           -> { where(enrollments: { status: :active }) },
           through: :enrollments,
           source: :course
  has_one :profile,
          dependent: :destroy
  has_many :media_files,
           dependent: :destroy
end
