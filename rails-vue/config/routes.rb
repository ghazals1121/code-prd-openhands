Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: { sessions: "api/v1/users/sessions", registrations: "api/v1/users/registrations" }
      resources :rooms, only: [:index, :show]
      resources :reservations, only: [:index, :create, :show, :destroy]
      resources :payments, only: [] do
        collection do
          post :create_intent
          post :webhook
        end
      end
    end
  end
end
