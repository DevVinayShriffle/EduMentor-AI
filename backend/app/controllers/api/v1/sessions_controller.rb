class Api::V1::SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]
  before_action :authenticate_logout_user!, only: [:destroy]

  def create
    user = User.find_for_database_authentication(email: sign_in_params[:email])

    unless user&.valid_password?(sign_in_params[:password])
      return render_unauthorized("Invalid email or password")
    end

    render json: {
      message: "Logged in successfully",
      token: "Bearer #{issue_jwt_for(user)}",
      user: serialized_user(user)
    }, status: :ok
  end

  def destroy
    @logout_user.update!(jti: SecureRandom.uuid)
    render json: { message: "Logged out successfully" }, status: :ok
  end

  private

  def authenticate_logout_user!
    auth_header = request.headers["Authorization"].to_s
    token = auth_header.sub(/\ABearer\s+/i, "").strip
    return render_unauthorized if token.blank?

    payload = Warden::JWTAuth::TokenDecoder.new.call(token)
    @logout_user = User.find_by(id: payload["sub"], jti: payload["jti"])
    return if @logout_user.present?

    render_unauthorized
  rescue JWT::DecodeError, JWT::VerificationError, JWT::ExpiredSignature
    render_unauthorized
  end

  def sign_in_params
    raw_params = params.require(:user).to_unsafe_h.slice("email", "password")

    {
      email: raw_params["email"].to_s.strip.downcase,
      password: raw_params["password"]
    }
  end

  def serialized_user(user)
    {
      id: user.id,
      email: user.email,
      role: user.role,
      phone_number: user.phone_number
    }
  end
end
