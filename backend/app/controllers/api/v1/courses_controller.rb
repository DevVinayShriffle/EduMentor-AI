class Api::V1::CoursesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course, only: [:show, :update, :destroy]
  before_action :require_teacher_or_admin!, only: [:create, :update, :destroy]

  # GET /courses
  def index
    courses = case current_user.role
              when "admin"
                Course.all
              when "teacher"
                current_user.courses
              else
                Course.published
              end

    render json: courses
  end

  # GET /courses/:id
  def show
    render json: @course
  end

  # POST /courses
  def create
    course = Course.new(course_params)

    # Teacher can only create their own course
    course.user_id = current_user.id if current_user.teacher?

    if course.save
      render json: course, status: :created
    else
      render json: { errors: course.errors }, status: :unprocessable_entity
    end
  end

  # PATCH /courses/:id
  def update
    return render_forbidden unless can_modify?(@course)

    if @course.update(course_params)
      render json: @course
    else
      render json: { errors: @course.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /courses/:id
  def destroy
    return render_forbidden unless can_modify?(@course)

    @course.destroy
    head :no_content
  end

  private

  def set_course
    @course = Course.find(params[:id])
  end

  def course_params
    params.require(:course).permit(
      :title,
      :description,
      :duration_type,
      :status,
      :user_id # only admin should use this
    )
  end

  def require_teacher_or_admin!
    return if current_user.teacher? || current_user.admin?

    render_forbidden
  end

  def can_modify?(course)
    current_user.admin? || course.user_id == current_user.id
  end

  def render_forbidden
    render json: { error: "Forbidden" }, status: :forbidden
  end
end
