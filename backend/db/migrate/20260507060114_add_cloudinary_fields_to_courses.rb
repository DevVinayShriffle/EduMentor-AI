class AddCloudinaryFieldsToCourses < ActiveRecord::Migration[8.1]
  def change
    add_column :courses, :thumbnail_public_id, :string
    add_column :courses, :banner_public_id, :string
  end
end
