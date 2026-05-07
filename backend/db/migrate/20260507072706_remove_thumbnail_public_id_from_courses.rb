class RemoveThumbnailPublicIdFromCourses < ActiveRecord::Migration[8.1]
  def change
    remove_column :courses, :thumbnail_public_id, :string
  end
end
