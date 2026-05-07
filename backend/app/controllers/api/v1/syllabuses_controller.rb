class Api::V1::SyllabusesController < ApplicationController
  before_action :set_course
  before_action :set_syllabus, only: [:show, :update, :destroy]

  # GET /courses/:course_id/syllabus
  def show
    authorize! :read, @course

    render json: @syllabus, include: :lessons
  end

  # POST /courses/:course_id/syllabus
  def create
    authorize! :update, @course

    syllabus = @course.build_syllabus(syllabus_params)

    if syllabus.save
      render json: syllabus, status: :created
    else
      render json: { errors: syllabus.errors }, status: :unprocessable_entity
    end
  end

  # PATCH /courses/:course_id/syllabus
  def update
    authorize! :update, @course

    if @syllabus.update(syllabus_params)
      render json: @syllabus
    else
      render json: { errors: @syllabus.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /courses/:course_id/syllabus
  def destroy
    authorize! :destroy, @course

    @syllabus.destroy
    head :no_content
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_syllabus
    @syllabus = @course.syllabus

    return if @syllabus.present?

    render json: { message: "Syllabus not found" }, status: :not_found
  end

  def syllabus_params
    params.require(:syllabus).permit(:title, :description, :status)
  end
end
