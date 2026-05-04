class Users::SessionsController < Devise::SessionsController
  skip_before_action :authenticate_user!, only: [:create]
  before_action :ensure_json_request
  before_action :authenticate_user!, only: [:destroy]

  def create
    user = User.find_for_database_authentication(email: sign_in_params[:email])

    unless user&.valid_password?(sign_in_params[:password])
      return render_unauthorized('Invalid email or password')
    end

    render json: {
      message: 'Logged in successfully',
      token: "Bearer #{issue_jwt_for(user)}",
      user: serialized_user(user)
    }, status: :ok
  end

  def destroy
    current_user.update!(jti: SecureRandom.uuid)
    render json: { message: 'Logged out successfully' }, status: :ok
  end

  private

  def sign_in_params
    params.require(:user).permit(:email, :password).tap do |allowed_params|
      allowed_params[:email] = allowed_params[:email].to_s.strip.downcase
    end
  end

  def serialized_user(user)
    {
      id: user.id,
      email: user.email,
      role: user.role,
      phone_number: user.phone_number
    }
  end

  def ensure_json_request
    request.format = :json
  end
end
