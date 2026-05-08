# frozen_string_literal: true

class LiveClass < ApplicationRecord
  belongs_to :course

  belongs_to :lesson,
             optional: true

  belongs_to :teacher,
             class_name: "User"

  has_many :live_class_attendances,
           dependent: :destroy

  has_many :attendees,
           through: :live_class_attendances,
           source: :user

  has_many :media_files,
           as: :mediable,
           dependent: :destroy

  enum :status, {
    scheduled: 0,
    live: 1,
    ended: 2,
    cancelled: 3
  }

  before_validation :generate_room_name,
                    on: :create

  validates :title,
            presence: true

  validates :scheduled_start_time,
            presence: true

  validates :room_name,
            presence: true,
            uniqueness: true

  def meeting_url
    "https://meet.jit.si/#{room_name}"
  end

  private

  def generate_room_name
    return if room_name.present?

    self.room_name = [
      "edumentor",
      "course",
      course_id,
      SecureRandom.hex(8)
    ].join("-")
  end
end