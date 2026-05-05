class Api::V1::EnrollmentsController < ApplicationController
  before_action :authenticate_user!

  # POST /enrollments
  def create
    return forbidden unless current_user.student?

    enrollment = Enrollment.new(enrollment_params)
    enrollment.user_id = current_user.id
    enrollment.status = :active

    if enrollment.save
      render json: {
        status: "success",
        message: "Enrollment created successfully",
        data: enrollment
      }, status: :created
    else
      render json: {
        status: "error",
        message: "Enrollment creation failed",
        data: enrollment.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  # GET /my-courses
  def my_courses
    render json: {
      status: "success",
      message: "Enrolled courses fetched successfully",
      data: current_user.enrolled_courses
    }, status: :ok
  end

  # PATCH /enrollments/:id/cancel
  def cancel
    enrollment = Enrollment.find(params[:id])

    if current_user.admin? || enrollment.user_id == current_user.id
      enrollment.update(status: :cancelled)

      render json: {
        status: "success",
        message: "Enrollment cancelled successfully",
        data: enrollment
      }, status: :ok
    else
      forbidden
    end
  end

  # GET /enrollments (admin only)
  def index
    return forbidden unless current_user.admin?

    render json: {
      status: "success",
      message: "All enrollments fetched successfully",
      data: Enrollment.all
    }, status: :ok
  end

  private

  def enrollment_params
    params.require(:enrollment).permit(:course_id)
  end

  def forbidden
    render json: {
      status: "error",
      message: "You are not authorized to perform this action",
      data: nil
    }, status: :forbidden
  end
end