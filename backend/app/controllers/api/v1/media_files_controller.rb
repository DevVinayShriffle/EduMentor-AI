class Api::V1::MediaFilesController < ApplicationController
  before_action :set_mediable, only: [:index, :create]
  before_action :set_media_file, only: [:show, :update, :destroy]

  # GET /lessons/:lesson_id/media_files
  def index
    authorize! :read, parent_course_for(@mediable)

    media_files = @mediable.media_files.order(:position)
    render json: {
      status: "success",
      message: "Media files fetched successfully",
      data: media_files
    }, status: :ok
  end

  # GET /media_files/:id
  def show
    authorize! :read, parent_course_for(@media_file.mediable)

    render json: {
      status: "success",
      message: "Media file fetched successfully",
      data: @media_file
    }, status: :ok
  end

  # POST /lessons/:lesson_id/media_files
  def create
    authorize! :update, parent_course_for(@mediable)

    media_file = @mediable.media_files.build(media_file_params)
    media_file.user = current_user

    if media_file.save
      render json: {
        status: "success",
        message: "Media file created successfully",
        data: media_file
      }, status: :created
    else
      render json: {
        status: "error",
        message: "Media file creation failed",
        data: media_file.errors
      }, status: :unprocessable_entity
    end
  end

  # PATCH /media_files/:id
  def update
    authorize! :update, parent_course_for(@media_file.mediable)

    if @media_file.update(media_file_params)
      render json: {
        status: "success",
        message: "Media file updated successfully",
        data: @media_file
      }, status: :ok
    else
      render json: {
        status: "error",
        message: "Media file update failed",
        data: @media_file.errors
      }, status: :unprocessable_entity
    end
  end

  # DELETE /media_files/:id
  def destroy
    authorize! :destroy, parent_course_for(@media_file.mediable)

    @media_file.destroy
    render json: {
      status: "success",
      message: "Media file deleted successfully",
      data: nil
    }, status: :ok
  end

  private

  def set_mediable
    @mediable =
      if params[:course_id]
        Course.find(params[:course_id])
      elsif params[:lesson_id]
        Lesson.find(params[:lesson_id])
      end

    return if @mediable.present?

    render json: {
      status: "error",
      message: "Parent resource not found",
      data: nil
    }, status: :not_found
  end

  def set_media_file
    @media_file = MediaFile.find(params[:id])
  end

  def parent_course_for(mediable)
    return mediable if mediable.is_a?(Course)

    mediable.syllabus.course
  end

  def media_file_params
    params.require(:media_file).permit(
      :title,
      :description,
      :file_type,
      :file_url,
      :public_id,
      :resource_type,
      :provider,
      :status,
      :position,
      :duration_seconds,
      :thumbnail_url,
      :free_preview
    )
  end
end
