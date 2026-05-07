class MediaFile < ApplicationRecord
  belongs_to :user
  belongs_to :course

  validates :file_url, presence: true
end
