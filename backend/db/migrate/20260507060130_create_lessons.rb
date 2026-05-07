class CreateLessons < ActiveRecord::Migration[8.1]
  def change
    create_table :lessons do |t|
      t.references :syllabus, null: false, foreign_key: true

      t.string :title, null: false
      t.text :description

      t.integer :lesson_type, default: 0, null: false
      t.integer :status, default: 0, null: false
      t.integer :position, default: 0, null: false
      t.integer :estimated_duration_minutes, default: 0, null: false

      t.timestamps
    end

    add_index :lessons, [:syllabus_id, :position]
  end
end