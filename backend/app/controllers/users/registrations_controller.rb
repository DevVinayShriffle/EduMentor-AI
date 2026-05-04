class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        message: 'Signed up successfully',
        user: {
          id: resource.id,
          email: resource.email,
          phone_number: resource.phone_number,
          role: resource.role
        }
      }, status: :created
    else
      render json: {
        message: 'Signup failed',
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def sign_up_params
    params.require(:user).permit(:email, :phone_number, :password, :password_confirmation, :role)
  end

  def account_update_params
    params.require(:user).permit(:email, :phone_number, :password, :password_confirmation, :current_password)
  end
end