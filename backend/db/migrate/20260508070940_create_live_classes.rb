# frozen_string_literal: true

class CreateLiveClasses < ActiveRecord::Migration[8.1]
  def change
    create_table :live_classes do |t|
      t.references :course, null: false, foreign_key: true

      t.references :lesson,
                   null: true,
                   foreign_key: true

      t.references :teacher,
                   null: false,
                   foreign_key: { to_table: :users }

      t.string :title, null: false
      t.text :description

      t.datetime :scheduled_start_time, null: false
      t.datetime :scheduled_end_time

      t.datetime :started_at
      t.datetime :ended_at

      t.integer :status, default: 0, null: false

      t.string :room_name, null: false

      t.string :meeting_provider,
               default: "jitsi",
               null: false

      t.boolean :recording_enabled,
                default: true,
                null: false

      t.timestamps
    end

    add_index :live_classes,
              :room_name,
              unique: true

    add_index :live_classes,
              [:course_id, :scheduled_start_time]

    add_index :live_classes,
              [:teacher_id, :scheduled_start_time]
  end
end