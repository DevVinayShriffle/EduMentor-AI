# frozen_string_literal: true

class LiveClassAttendance < ApplicationRecord
  belongs_to :live_class
  belongs_to :user

  validates :user_id,
            uniqueness: {
              scope: :live_class_id
            }

  before_save :calculate_duration

  private

  def calculate_duration
    return unless joined_at.present? &&
                  left_at.present?

    self.duration_seconds =
      (left_at - joined_at).to_i
  end
end