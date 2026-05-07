class Api::V1::LessonsController < ApplicationController
  before_action :set_syllabus, only: [:index, :create]
  before_action :set_lesson, only: [:show, :update, :destroy]

  # GET /syllabuses/:syllabus_id/lessons
  def index
    authorize! :read, @syllabus.course

    lessons = @syllabus.lessons.order(:position)
    render json: {
      status: "success",
      message: "Lessons fetched successfully",
      data: lessons
    }, status: :ok
  end

  # GET /lessons/:id
  def show
    authorize! :read, @lesson.syllabus.course

    render json: {
      status: "success",
      message: "Lesson fetched successfully",
      data: @lesson.as_json(include: :media_files)
    }, status: :ok
  end

  # POST /syllabuses/:syllabus_id/lessons
  def create
    authorize! :update, @syllabus.course

    lesson = @syllabus.lessons.build(lesson_params)

    if lesson.save
      render json: {
        status: "success",
        message: "Lesson created successfully",
        data: lesson
      }, status: :created
    else
      render json: {
        status: "error",
        message: "Lesson creation failed",
        data: lesson.errors
      }, status: :unprocessable_entity
    end
  end

  # PATCH /lessons/:id
  def update
    authorize! :update, @lesson.syllabus.course

    if @lesson.update(lesson_params)
      render json: {
        status: "success",
        message: "Lesson updated successfully",
        data: @lesson
      }, status: :ok
    else
      render json: {
        status: "error",
        message: "Lesson update failed",
        data: @lesson.errors
      }, status: :unprocessable_entity
    end
  end

  # DELETE /lessons/:id
  def destroy
    authorize! :destroy, @lesson.syllabus.course

    @lesson.destroy
    render json: {
      status: "success",
      message: "Lesson deleted successfully",
      data: nil
    }, status: :ok
  end

  private

  def set_syllabus
    @syllabus = Syllabus.find(params[:syllabus_id])
  end

  def set_lesson
    @lesson = Lesson.find(params[:id])
  end

  def lesson_params
    params.require(:lesson).permit(
      :title,
      :description,
      :lesson_type,
      :status,
      :position,
      :estimated_duration_minutes
    )
  end
end
