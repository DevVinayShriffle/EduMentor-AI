class EmailService
  def self.send_welcome_email(user)
    UserMailer.welcome_email(user).deliver_later(wait: 1.minute)
  end
end