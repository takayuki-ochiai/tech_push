class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # これをしないと API で POST の時にCSRFエラー
  protect_from_forgery with: :null_session


  # protect_from_forgery with: :exception
end
