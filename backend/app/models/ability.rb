# frozen_string_literal: true

class Ability
  include CanCan::Ability
  
  def initialize(user)
    user ||= User.new #guest user
    
    if user.admin?
      can :manage, :all

    elsif user.teacher?
      can :manage, Course, user_id: user.id
      
      can :read, Enrollment
      
    elsif user.student?
      can :read, Course, status: "published"
      can :create, Enrollment
      can :read, Enrollment, user_id: user.id
      can :update, Enrollment, user_id: user.id
      can :cancel, Enrollment, user_id: user.id
      can :my_courses, Enrollment
    end
  end
end
