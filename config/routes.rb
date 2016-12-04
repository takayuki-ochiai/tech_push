Rails.application.routes.draw do
  devise_for :users
  mount API::Root => '/'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    # localhost:3000/api/v1/auth に認証API
    mount_devise_token_auth_for 'User', at: '/v1/auth'

  end
end
