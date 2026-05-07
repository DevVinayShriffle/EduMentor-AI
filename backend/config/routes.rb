Rails.application.routes.draw do
  devise_for :users, skip: [:sessions, :registrations]

  namespace :api do
    namespace :v1 do
      post "/signup", to: "registrations#create"
      post "/login", to: "sessions#create"
      delete "/logout", to: "sessions#destroy"

      resources :courses do
        resource :syllabus, only: [:show, :create, :update, :destroy]
        resources :media_files, only: [:index, :create]
      end

      resources :syllabuses, only: [] do
        resources :lessons, only: [:index, :create]
      end

      resources :lessons, only: [:show, :update, :destroy] do
        resources :media_files, only: [:index, :create]
      end

      resources :media_files, only: [:show, :update, :destroy]

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
