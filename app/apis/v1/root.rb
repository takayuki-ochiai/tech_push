module V1
  class Root < Grape::API
    # http://localhost:3000/api/v1/
    prefix :api
    version 'v1'
    format :json

    # 認証エラーが発生した場合は400エラーを返します。
    rescue_from AuthenticationError do |e|
      Rails.logger.info(e.message)
      authenticate_error
    end

    rescue_from :all do |e|
      Root.logger.error(e.message.to_s << "\n" << e.backtrace.join("\n"))
      error!({ message: "Server Error"}, 500)
    end

    helpers do
      def warden
        env['warden']
      end

      def authenticated?
        if params[:access_token] && @user = User.find_by_authentication_token(params[:access_token])
          return true
        end
        warden.authenticated?
      end

      def current_user
        @user || warden.user
      end

      # Authentication Failure
      # Renders a 401 error
      def authenticate_error
        # User's token is either invalid or not in the right format
        error!({ message: "認証エラーです！", status: 400 }, 400)
      end
    end
    mount V1::Login
  end
end
