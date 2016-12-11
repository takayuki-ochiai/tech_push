class ApplicationController < ActionController::Base
  # これをしないと API で POST の時にCSRFエラー
  protect_from_forgery with: :null_session

  def authenticated
    return if user_signed_in?
    redirect_to signin_path
  end
end
