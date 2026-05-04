class ApplicationController < ActionController::API
  before_action :authenticate_user!, unless: :devise_controller?

  rescue_from ActionController::ParameterMissing, with: :render_bad_request
  rescue_from Warden::NotAuthenticated, with: :render_default_unauthorized

  private

  def render_unauthorized(message = 'You need to sign in or sign up before continuing.')
    render json: { message: message }, status: :unauthorized
  end

  def render_bad_request(exception)
    render json: { message: exception.message }, status: :bad_request
  end

  def render_default_unauthorized
    render_unauthorized
  end

  def issue_jwt_for(user)
    token, = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil)
    response.set_header('Authorization', "Bearer #{token}")
    token
  end
end
