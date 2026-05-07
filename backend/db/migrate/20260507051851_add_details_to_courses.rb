class AddDetailsToCourses < ActiveRecord::Migration[8.1]
  def change
    add_column :courses, :thumbnail_url, :string
    add_column :courses, :banner_url, :string

    add_column :courses,
                :price,
                :decimal,
                precision: 10,
                scale: 2,
                default: 0,
                null: false

    add_column :courses,
                :currency,
                :string,
                default: "INR",
                null: false

    add_column :courses, :target_exam, :string
    add_column :courses, :class_level, :string
    add_column :courses, :language, :string

    add_column :courses, :starts_on, :date
    add_column :courses, :ends_on, :date

    add_column :courses,
                :total_lessons,
                :integer,
                default: 0,
                null: false

    add_column :courses,
                :total_tests,
                :integer,
                default: 0,
                null: false

    add_column :courses,
                :featured,
                :boolean,
                default: false,
                null: false
  end
end
