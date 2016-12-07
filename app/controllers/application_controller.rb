class ApplicationController < ActionController::Base
  # これをしないと API で POST の時にCSRFエラー
  protect_from_forgery with: :null_session
end
