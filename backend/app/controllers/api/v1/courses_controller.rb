class Api::V1::CoursesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course, only: [:show, :update, :destroy, :upload_banner, :upload_thumbnail]

  # GET /courses
  def index
    authorize! :read, Course

    courses = case current_user.role
              when "admin"
                Course.includes(:teacher)
              when "teacher"
                current_user.courses.includes(:teacher)
              else
                Course.published.includes(:teacher)
              end

    render json: {
      status: "success",
      message: "Courses fetched successfully",
      data: CourseSerializer.new(courses).serializable_hash
    }, status: :ok
  end

  # GET /courses/:id
  def show
    authorize! :read, @course

    render json: {
      status: "success",
      message: "Course fetched successfully",
      data: CourseSerializer.new(@course).serializable_hash
    }, status: :ok
  end

  # POST /courses
  def create
    course = Course.new(course_params)

    # Teacher can only create their own course
    course.user_id = current_user.id if current_user.teacher?

    authorize! :create, course

    if course.save
      render json: {
        status: "success",
        message: "Course created successfully",
        data: CourseSerializer.new(course).serializable_hash
      }, status: :created
    else
      render json: {
        status: "error",
        message: "Course creation failed",
        data: course.errors
      }, status: :unprocessable_entity
    end
  end

  # PATCH /courses/:id
  def update
    authorize! :update, @course

    if @course.update(course_params)
      render json: {
        status: "success",
        message: "Course updated successfully",
        data: CourseSerializer.new(@course).serializable_hash
      }, status: :ok
    else
      render json: {
        status: "error",
        message: "Course update failed",
        data: @course.errors
      }, status: :unprocessable_entity
    end
  end

  # DELETE /courses/:id
  def destroy
    authorize! :destroy, @course

    @course.destroy
    render json: {
      status: "success",
      message: "Course deleted successfully",
      data: nil
    }, status: :ok
  end

  # PATCH /courses/:id/upload_banner
  def upload_banner
    authorize! :update, @course

    return render json: {
      status: "error",
      message: "Banner file missing",
      data: nil
    }, status: :unprocessable_entity unless params[:banner]

    if @course.banner_public_id.present?
      CloudinaryService.destroy(public_id: @course.banner_public_id)
    end

    upload_result = CloudinaryService.upload(
      file: params[:banner],
      folder: "edumentor/courses/#{@course.id}/banner"
    )

    thumbnail_data = CloudinaryService.thumbnail_variant(public_id: upload_result[:public_id])

    @course.update!(
      banner_url: upload_result[:url],
      banner_public_id: upload_result[:public_id],
      thumbnail_url: thumbnail_data[:url]
    )

    render json: {
      status: "success",
      message: "Banner uploaded successfully",
      data: {
        banner_url: @course.banner_url,
        thumbnail_url: @course.thumbnail_url
      }
    }, status: :ok
  end

  # PATCH /courses/:id/upload_thumbnail
  def upload_thumbnail
    authorize! :update, @course

    return render json: {
      status: "error",
      message: "Thumbnail file missing",
      data: nil
    }, status: :unprocessable_entity unless params[:thumbnail]

    upload_result = CloudinaryService.upload(
      file: params[:thumbnail],
      folder: "edumentor/courses/#{@course.id}/thumbnail"
    )

    @course.update!(thumbnail_url: upload_result[:url])

    render json: {
      status: "success",
      message: "Thumbnail uploaded successfully",
      data: {
        thumbnail_url: @course.thumbnail_url
      }
    }, status: :ok
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
      :user_id,
      :thumbnail_url,
      :banner_url,
      :price,
      :currency,
      :target_exam,
      :class_level,
      :language,
      :starts_on,
      :ends_on,
      :featured,
      :total_lessons,
      :total_tests
    )
  end
end
