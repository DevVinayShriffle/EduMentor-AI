# frozen_string_literal: true

class CreateLiveClassAttendances < ActiveRecord::Migration[8.1]
  def change
    create_table :live_class_attendances do |t|
      t.references :live_class,
                   null: false,
                   foreign_key: true

      t.references :user,
                   null: false,
                   foreign_key: true

      t.datetime :joined_at
      t.datetime :left_at

      t.integer :duration_seconds,
                default: 0,
                null: false

      t.timestamps
    end

    add_index :live_class_attendances,
              [:live_class_id, :user_id],
              unique: true
  end
end