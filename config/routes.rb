Rails.application.routes.draw do
  namespace :admin do
    resources :users, except: [:show]
    resources :people, except: [:show]
    resources :invitations, except: [:show]
    resources :workshops, except: [:show]
    resources :workshop_sessions, except: [:show]
    get '/', to: redirect('/admin/users')
  end

  get '/hi/:token', to: 'invitations#show', as: :invitation
  get '/hi/:token/chat', to: 'invitations#chat'
  post '/hi/:token/chat', to: 'invitations#chat'

  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "pages#home"
end
