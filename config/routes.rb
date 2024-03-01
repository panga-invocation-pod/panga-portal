Rails.application.routes.draw do
  namespace :admin do
    resources :users, except: [:show]
    resources :people, except: [:show]
    resources :invitations, except: [:show] do
      member do
        put :reset
      end
    end
    resources :events, except: [:show]
    resources :event_sessions do
      member do
      post :invite_all_planned
      end
    end
    resources :attendances, except: [:show] do
      member do
        put :make_invitee
        put :unmake_invitee
        put :retract_invitation
        put :resend_invitation
      end
    end
    resources :locations, except: [:show]

    get '/', to: redirect('/admin/users')
  end

  resources :event_sessions, only: [:show]

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
