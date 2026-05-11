# frozen_string_literal: true

class Api::V1::LiveClassesController < ApplicationController
  before_action :authenticate_user!

  before_action :set_live_class,
                only: [
                  :show,
                  :start,
                  :end,
                  :cancel,
                  :join,
                  :leave
                ]

  def index
    live_classes =
      LiveClass.accessible_by(current_ability)
               .includes(:course, :teacher)
               .order(scheduled_start_time: :asc)

    render json: {
      success: true,
      data: live_classes
    }, status: :ok
  end

  def show
    authorize! :read, @live_class

    render json: {
      success: true,
      data: @live_class
    }, status: :ok
  end

  def create
    live_class =
      LiveClass.new(live_class_params)

    live_class.teacher = current_user

    authorize! :create, live_class

    if live_class.save
      render json: {
        success: true,
        message: "Live class scheduled successfully",
        data: live_class
      }, status: :created
    else
      render json: {
        success: false,
        errors: live_class.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def start
    authorize! :start, @live_class

    @live_class.update!(
      status: :live,
      started_at: Time.current
    )

    render json: {
      success: true,
      message: "Class started",
      data: join_payload(@live_class)
    }, status: :ok
  end

  def end
    authorize! :end, @live_class

    @live_class.update!(
      status: :ended,
      ended_at: Time.current
    )

    render json: {
      success: true,
      message: "Class ended"
    }, status: :ok
  end

  def join
    authorize! :join, @live_class

    attendance =
      LiveClassAttendance.find_or_initialize_by(
        live_class: @live_class,
        user: current_user
      )

    attendance.joined_at ||= Time.current

    attendance.save!

    render json: {
      success: true,
      message: "Joined live class",
      data: join_payload(@live_class)
    }, status: :ok
  end

  def leave
    authorize! :leave, @live_class

    attendance =
      LiveClassAttendance.find_by(
        live_class: @live_class,
        user: current_user
      )

    attendance&.update!(
      left_at: Time.current
    )

    render json: {
      success: true,
      message: "Left live class"
    }, status: :ok
  end

  def cancel
    authorize! :cancel, @live_class

    @live_class.update!(
      status: :cancelled
    )

    render json: {
      success: true,
      message: "Class cancelled"
    }, status: :ok
  end

  private

  def set_live_class
    @live_class = LiveClass.find(params[:id])
  end

  def live_class_params
    params.require(:live_class).permit(
      :course_id,
      :lesson_id,
      :title,
      :description,
      :scheduled_start_time,
      :scheduled_end_time,
      :recording_enabled
    )
  end

  def join_payload(live_class)
    {
      id: live_class.id,
      title: live_class.title,
      room_name: live_class.room_name,
      domain: "meet.jit.si",
      display_name:
        current_user.profile&.full_name ||
        current_user.email,
      email: current_user.email,
      role: current_user.role
    }
  end
end