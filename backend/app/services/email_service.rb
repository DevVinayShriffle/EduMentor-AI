class EmailService
  def self.send_welcome_email(user)
    UserMailer.welcome_email(user).deliver_now
  end
end