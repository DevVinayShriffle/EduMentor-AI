class MediaFile < ApplicationRecord
  belongs_to :mediable, polymorphic: true
  belongs_to :user

  before_destroy :remove_cloudinary_asset

  enum :file_type, {video: 0, pdf: 1, image: 2, document: 3, assignment: 4, note: 5}
  enum :provider, {cloudinary: 0, youtube: 1, vimeo: 2, aws_s3: 3}
  enum :status, {draft: 0, processing: 1, published: 2, failed: 3, archived: 4}

  validates :file_url, presence: true
  validates :public_id, presence: true, if: :cloudinary?
  validates :position, numericality: { greater_than_or_equal_to: 0 }

  def cloudinary_backed?
    cloudinary? && public_id.present?
  end

  private

  def remove_cloudinary_asset
    return unless cloudinary_backed?

    CloudinaryService.destroy(
      public_id: public_id,
      resource_type: resource_type.presence || "image"
    )
  end
end
