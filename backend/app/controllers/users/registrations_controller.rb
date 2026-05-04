class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate_user!, only: [:create]
  before_action :ensure_json_request

  def create
    build_resource(sign_up_params)

    if resource.save
      render json: {
        message: 'Signed up successfully',
        token: issue_jwt_for(resource),
        user: serialized_user(resource)
      }, status: :created
    else
      render json: {
        message: 'Signup failed',
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def sign_up(_resource_name, _resource)
    true
  end

  def sign_up_params
    allowed_params = params.require(:user).permit(:email, :phone_number, :password, :password_confirmation, :role)
    allowed_params[:email] = allowed_params[:email].to_s.strip.downcase
    allowed_params[:role] = 'student' unless allowed_params[:role].in?(%w[student teacher])
    allowed_params
  end

  def account_update_params
    params.require(:user).permit(:phone_number, :password, :password_confirmation, :current_password)
  end

  def serialized_user(user)
    {
      id: user.id,
      email: user.email,
      phone_number: user.phone_number,
      role: user.role
    }
  end

  def ensure_json_request
    request.format = :json
  end
end
