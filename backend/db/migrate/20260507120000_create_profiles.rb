class CreateProfiles < ActiveRecord::Migration[8.1]
  def change
    create_table :profiles do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }

      t.string :full_name
      t.string :avatar_url
      t.date :date_of_birth
      t.string :gender

      t.string :city
      t.string :state
      t.string :country
      t.text :address

      t.string :school_or_college
      t.string :class_level
      t.string :target_exam

      t.string :guardian_name
      t.string :guardian_phone

      t.text :bio

      t.timestamps
    end
  end
end
