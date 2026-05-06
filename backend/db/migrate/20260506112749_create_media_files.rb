class CreateMediaFiles < ActiveRecord::Migration[8.1]
  def change
    create_table :media_files do |t|
      t.string :file_url
      t.string :public_id
      t.string :resource_type
      t.references :user, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
