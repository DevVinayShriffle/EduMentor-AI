class MakeMediaFilesPolymorphic < ActiveRecord::Migration[8.1]
  def change
    remove_reference :media_files, :course, foreign_key: true

    add_reference :media_files, :mediable, polymorphic: true, null: false

    add_column :media_files, :title, :string
    add_column :media_files, :description, :text
    add_column :media_files, :thumbnail_url, :string

    add_column :media_files, :file_type, :integer, default: 0, null: false
    add_column :media_files, :provider, :integer, default: 0, null: false
    add_column :media_files, :position, :integer, default: 0, null: false
    add_column :media_files, :duration_seconds, :integer, default: 0, null: false
    add_column :media_files, :status, :integer, default: 0, null: false
    add_column :media_files, :free_preview, :boolean, default: false, null: false

    add_index :media_files, [:mediable_type, :mediable_id, :position]
  end
end