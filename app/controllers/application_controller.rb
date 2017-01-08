class ApplicationController < ActionController::Base
  # これをしないと API で POST の時にCSRFエラー
  protect_from_forgery with: :null_session

  def authenticated
    return if user_signed_in?
    redirect_to signin_path
  end

  def admin_user!
    unless current_user.admin?
      redirect_to root_path
    end
  end
end
