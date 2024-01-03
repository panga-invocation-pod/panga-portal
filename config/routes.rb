Rails.application.routes.draw do
  namespace :admin do
    resources :users, except: [:show]
    resources :people, except: [:show]
    resources :invitations, except: [:show] do
      member do
        put :reset
      end
    end

    resources :workshops, except: [:show]
    resources :workshop_sessions, except: [:show]
    resources :workshop_attendances, except: [:show]
    get '/', to: redirect('/admin/users')
  end

  get '/api/invitations/:token/chat', to: 'invitations#chat'
  post '/api/invitations/:token/chat', to: 'invitations#chat'

  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  get '/hi/:token', to: 'pages#home', as: :invitation

  # Defines the root path route ("/")
  root "pages#home"
end
