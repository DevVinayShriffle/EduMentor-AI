class Api::V1::CoursesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_course, only: [:show, :update, :destroy, :upload_banner]
  
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
    
    render json: CourseSerializer.new(courses).serializable_hash, status: :ok
  end
  
  # GET /courses/:id
  def show
    authorize! :read, @course
    
    render json: CourseSerializer.new(@course).serializable_hash, status: :ok
  end
  
  # POST /courses
  def create
    course = Course.new(course_params)
    
    # Teacher can only create their own course
    course.user_id = current_user.id if current_user.teacher?
    
    authorize! :create, course
    
    if course.save
      render json: ::CourseSerializer.new(course).serializable_hash, status: :created
    else
      render json: { errors: course.errors }, status: :unprocessable_entity
    end
  end
  
  # PATCH /courses/:id
  def update
    authorize! :update, @course
    
    if @course.update(course_params)
      render json: @course
    else
      render json: { errors: @course.errors }, status: :unprocessable_entity
    end
  end
  
  # DELETE /courses/:id
  def destroy
    authorize! :destroy, @course
    
    @course.destroy
    head :no_content
  end

  # PATCH /courses/:id/upload_banner
  def upload_banner
    authorize! :update, @course

    return render_error("Banner file missing") unless params[:banner]

    if @course.banner_public_id.present?
      CloudinaryService.destroy(
        public_id: @course.banner_public_id
      )
    end

    upload_result = CloudinaryService.upload(
      file: params[:banner],
      folder: "edumentor/courses/#{@course.id}/banner"
    )

    thumbnail_data = CloudinaryService.thumbnail_variant(
      public_id: upload_result[:public_id]
    )

    @course.update!(
      banner_url: upload_result[:url],
      banner_public_id: upload_result[:public_id],
      thumbnail_url: thumbnail_data[:url]
    )

    render json: {
      message: "Banner uploaded successfully",
      data: {
        banner_url: @course.banner_url,
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
      :featured
    )
  end
end
