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

    media_file = @mediable.media_files.build(media_file_attributes)
    media_file.user = current_user

    attach_uploaded_file!(media_file, uploaded_file) if uploaded_file.present?

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

    previous_public_id = @media_file.public_id
    previous_resource_type = @media_file.resource_type

    @media_file.assign_attributes(media_file_attributes)
    attach_uploaded_file!(@media_file, uploaded_file) if uploaded_file.present?

    if @media_file.save
      destroy_replaced_cloudinary_asset(previous_public_id, previous_resource_type) if uploaded_file.present?

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
      :file,
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

  def uploaded_file
    media_file_params[:file]
  end

  def media_file_attributes
    media_file_params.except(
      :file,
      :file_url,
      :public_id,
      :resource_type,
      :provider,
      :thumbnail_url
    )
  end

  def attach_uploaded_file!(media_file, file)
    upload_result = CloudinaryService.upload(
      file: file,
      folder: cloudinary_folder_for(media_file.mediable)
    )

    thumbnail_data = CloudinaryService.thumbnail_variant(
      public_id: upload_result[:public_id],
      resource_type: upload_result[:resource_type],
      width: 320,
      height: 180
    )

    media_file.assign_attributes(
      file_url: upload_result[:url],
      public_id: upload_result[:public_id],
      resource_type: upload_result[:resource_type],
      provider: :cloudinary,
      thumbnail_url: thumbnail_data&.dig(:url)
    )
  end

  def cloudinary_folder_for(mediable)
    if mediable.is_a?(Course)
      "edumentor/courses/#{mediable.id}/media_files"
    else
      "edumentor/courses/#{mediable.syllabus.course_id}/lessons/#{mediable.id}/media_files"
    end
  end

  def destroy_replaced_cloudinary_asset(public_id, resource_type)
    return if public_id.blank?

    CloudinaryService.destroy(
      public_id: public_id,
      resource_type: resource_type.presence || "image"
    )
  end
end
