Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  mount API::Root => '/'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'main#index'
  # get 'signin', to: 'sessions#index'

  namespace :admin do
    get 'signin', to: 'sessions#index'
    resources :books
  end
end
