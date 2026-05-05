class Api::V1::RegistrationsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]

  def create
    user = User.new(sign_up_params)

    if user.save
      render json: {
        message: "Signed up successfully",
        token: "Bearer #{issue_jwt_for(user)}",
        user: serialized_user(user)
      }, status: :created
    else
      render json: {
        message: "Signup failed",
        errors: user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    allowed_params = params.require(:user).permit(
      :email,
      :phone_number,
      :password,
      :password_confirmation,
      :role
    )

    allowed_params[:email] = allowed_params[:email].to_s.strip.downcase
    allowed_params[:role] = "student" unless allowed_params[:role].in?(%w[student teacher])
    allowed_params
  end

  def serialized_user(user)
    {
      id: user.id,
      email: user.email,
      phone_number: user.phone_number,
      role: user.role
    }
  end
end
