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
      
      can :create, LiveClass
      
      can :read,
      LiveClass,
      teacher_id: user.id
      
      can :update,
      LiveClass,
      teacher_id: user.id
      
      can :start,
      LiveClass,
      teacher_id: user.id
      
      can :end,
      LiveClass,
      teacher_id: user.id
      
      can :cancel,
      LiveClass,
      teacher_id: user.id
      
    elsif user.student?
      can :read, Course, status: "published"
      can :create, Enrollment
      can :read, Enrollment, user_id: user.id
      can :update, Enrollment, user_id: user.id
      can :cancel, Enrollment, user_id: user.id
      can :my_courses, Enrollment
      
      can :read, LiveClass do |live_class|
        user.enrollments.active.exists?(
        course_id: live_class.course_id
        )
      end
      
      can :join, LiveClass do |live_class|
        live_class.live? &&
        user.enrollments.active.exists?(
        course_id: live_class.course_id
        )
      end
      
      can :leave, LiveClass do |live_class|
        user.enrollments.active.exists?(
        course_id: live_class.course_id
        )
      end
    end
  end
end
