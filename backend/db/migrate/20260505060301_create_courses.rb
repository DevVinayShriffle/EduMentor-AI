class CreateCourses < ActiveRecord::Migration[8.1]
  def change
    create_table :courses do |t|
      t.string :title
      t.text :description
      t.integer :duration_type
      t.integer :status
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
