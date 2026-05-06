class UserMailer < ApplicationMailer
  default from: ENV['SENDGRID_FROM_EMAIL']

  def welcome_email(user)
    @user = user
    mail(
      to: @user.email,
      subject: "Welcome to My App 🚀"
    )
  end
end