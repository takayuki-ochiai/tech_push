module V1
  class Root < Grape::API
    # http://localhost:3000/api/v1/
    prefix :api
    version 'v1'
    format :json

    rescue_from :all do |e|
      Root.logger.error(e.message.to_s << "\n" << e.backtrace.join("\n"))
      error!({ message: "Server Error"}, 500)
    end

    helpers do
      def authenticate_error!
        # 認証が失敗したときのエラー
        h = {'Access-Control-Allow-Origin' => "*",
             'Access-Control-Request-Method' => %w{GET POST OPTIONS}.join(",")}
        error!('You need to log in to use the app.', 401, h)
      end

      def authenticate_user!
        # header から認証に必要な情報を取得
        uid = request.headers['Uid']
        token = request.headers['Access-Token']
        client = request.headers['Client']
        @user = User.find_by_uid(uid)

        # 認証に失敗したらエラー
        unless @user && @user.valid_token?(token, client)
          authenticate_error!
        end
      end
    end
    mount V1::Sample

    desc 'GET /api/v1/testlogin'
    get 'testlogin' do
      authenticate_user!
      {message: 'testだよ'}
    end
  end
end
