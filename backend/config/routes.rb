Rails.application.routes.draw do
  devise_for :users, skip: [:sessions, :registrations]

  namespace :api do
    namespace :v1 do
      post "/signup", to: "registrations#create"
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"

      resources :courses do
        member do
          patch :upload_thumbnail
          patch :upload_banner
        end
      end

      resources :enrollments, only: [:create, :index] do
        member do
          patch :cancel
        end
      end

      get "/my-courses", to: "enrollments#my_courses"
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
