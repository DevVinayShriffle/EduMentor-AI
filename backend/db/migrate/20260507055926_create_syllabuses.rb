class CreateSyllabuses < ActiveRecord::Migration[8.1]
  def change
    create_table :syllabuses do |t|
      t.references :course, null: false, foreign_key: true, index: { unique: true }

      t.string :title, null: false
      t.text :description
      t.integer :status, default: 0, null: false

      t.timestamps
    end
  end
end
