class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  enum :role, {student: 0, teacher: 1, admin: 2}

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable,
         :validatable, :jwt_authenticatable,
         jwt_revocation_strategy: self
end