class Api::V1::SyllabusesController < ApplicationController
  before_action :set_course
  before_action :set_syllabus, only: [:show, :update, :destroy]

  # GET /courses/:course_id/syllabus
  def show
    authorize! :read, @course

    render json: {
      status: "success",
      message: "Syllabus fetched successfully",
      data: @syllabus.as_json(include: :lessons)
    }, status: :ok
  end

  # POST /courses/:course_id/syllabus
  def create
    authorize! :update, @course

    syllabus = @course.build_syllabus(syllabus_params)

    if syllabus.save
      render json: {
        status: "success",
        message: "Syllabus created successfully",
        data: syllabus
      }, status: :created
    else
      render json: {
        status: "error",
        message: "Syllabus creation failed",
        data: syllabus.errors
      }, status: :unprocessable_entity
    end
  end

  # PATCH /courses/:course_id/syllabus
  def update
    authorize! :update, @course

    if @syllabus.update(syllabus_params)
      render json: {
        status: "success",
        message: "Syllabus updated successfully",
        data: @syllabus
      }, status: :ok
    else
      render json: {
        status: "error",
        message: "Syllabus update failed",
        data: @syllabus.errors
      }, status: :unprocessable_entity
    end
  end

  # DELETE /courses/:course_id/syllabus
  def destroy
    authorize! :destroy, @course

    @syllabus.destroy
    render json: {
      status: "success",
      message: "Syllabus deleted successfully",
      data: nil
    }, status: :ok
  end

  private

  def set_course
    @course = Course.find(params[:course_id])
  end

  def set_syllabus
    @syllabus = @course.syllabus

    return if @syllabus.present?

    render json: {
      status: "error",
      message: "Syllabus not found",
      data: nil
    }, status: :not_found
  end

  def syllabus_params
    params.require(:syllabus).permit(:title, :description, :status)
  end
end
