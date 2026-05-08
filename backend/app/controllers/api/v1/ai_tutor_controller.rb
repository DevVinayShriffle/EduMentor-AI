# frozen_string_literal: true

class Api::V1::AiTutorController < ApplicationController
  before_action :authenticate_user!

  def chat
    return render_error("Messages are required") if params[:messages].blank?

    result = Ai::OpenRouterService.chat(
      messages: params[:messages]
    )

    if result[:success]
      render json: {
        success: true,
        reply: result[:reply]
      }, status: :ok
    else
      render json: {
        success: false,
        error: result[:error]
      }, status: :unprocessable_entity
    end
  end

  private

  def render_error(message)
    render json: {
      success: false,
      error: message
    }, status: :unprocessable_entity
  end
end