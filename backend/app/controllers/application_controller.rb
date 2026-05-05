class ApplicationController < ActionController::API
  before_action :authenticate_user!

  rescue_from ActionController::ParameterMissing, with: :render_bad_request
  rescue_from Warden::NotAuthenticated, with: :render_unauthorized_response

  private

  def issue_jwt_for(user)
    token, = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil)
    response.set_header("Authorization", "Bearer #{token}")
    token
  end

  def render_unauthorized(message = "Unauthorized")
    render json: { message: message }, status: :unauthorized
  end

  def render_bad_request(exception)
    render json: { message: exception.message }, status: :bad_request
  end

  def render_unauthorized_response(_exception = nil)
    render_unauthorized
  end
end
