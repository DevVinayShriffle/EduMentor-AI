# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_05_07_072706) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "courses", force: :cascade do |t|
    t.string "banner_public_id"
    t.string "banner_url"
    t.string "class_level"
    t.datetime "created_at", null: false
    t.string "currency", default: "INR", null: false
    t.text "description"
    t.integer "duration_type"
    t.date "ends_on"
    t.boolean "featured", default: false, null: false
    t.string "language"
    t.decimal "price", precision: 10, scale: 2, default: "0.0", null: false
    t.date "starts_on"
    t.integer "status"
    t.string "target_exam"
    t.string "thumbnail_url"
    t.string "title"
    t.integer "total_lessons", default: 0, null: false
    t.integer "total_tests", default: 0, null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_courses_on_user_id"
  end

  create_table "enrollments", force: :cascade do |t|
    t.bigint "course_id", null: false
    t.datetime "created_at", null: false
    t.integer "status"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["course_id"], name: "index_enrollments_on_course_id"
    t.index ["user_id"], name: "index_enrollments_on_user_id"
  end

  create_table "lessons", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.integer "estimated_duration_minutes", default: 0, null: false
    t.integer "lesson_type", default: 0, null: false
    t.integer "position", default: 0, null: false
    t.integer "status", default: 0, null: false
    t.bigint "syllabus_id", null: false
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.index ["syllabus_id", "position"], name: "index_lessons_on_syllabus_id_and_position"
    t.index ["syllabus_id"], name: "index_lessons_on_syllabus_id"
  end

  create_table "media_files", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "description"
    t.integer "duration_seconds", default: 0, null: false
    t.integer "file_type", default: 0, null: false
    t.string "file_url"
    t.boolean "free_preview", default: false, null: false
    t.bigint "mediable_id", null: false
    t.string "mediable_type", null: false
    t.integer "position", default: 0, null: false
    t.integer "provider", default: 0, null: false
    t.string "public_id"
    t.string "resource_type"
    t.integer "status", default: 0, null: false
    t.string "thumbnail_url"
    t.string "title"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["mediable_type", "mediable_id", "position"], name: "idx_on_mediable_type_mediable_id_position_2f97f05572"
    t.index ["mediable_type", "mediable_id"], name: "index_media_files_on_mediable"
    t.index ["user_id"], name: "index_media_files_on_user_id"
  end

  create_table "syllabuses", force: :cascade do |t|
    t.bigint "course_id", null: false
    t.datetime "created_at", null: false
    t.text "description"
    t.integer "status", default: 0, null: false
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_syllabuses_on_course_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "jti", null: false
    t.string "phone_number", null: false
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.integer "role", default: 0, null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["phone_number"], name: "index_users_on_phone_number", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "courses", "users"
  add_foreign_key "enrollments", "courses"
  add_foreign_key "enrollments", "users"
  add_foreign_key "lessons", "syllabuses"
  add_foreign_key "media_files", "users"
  add_foreign_key "syllabuses", "courses"
end
