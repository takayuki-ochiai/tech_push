using HashSerializeKeys
module V1
  class Login < Grape::API
    rescue_from StandardError do |e|
      Rails.logger.info(e.message)
      rack_response({ message: e.message, status: 500 }.to_json, 500)
    end

    # http://localhost:3000/api/v1/access_token
    resource :access_token do
      desc '現在のアクセストークンを戻す'
      get '/' do
        if authenticated?
          user = current_user
          {access_token: user.access_token}.camelize_keys
        else
          authenticate_error
        end
      end
    end


    resource :access_token do
      desc '新しいアクセストークンを発行'
      post '/' do
        if authenticated?
          user = current_user
          user.update_access_token!
          {access_token: user.access_token}.camelize_keys
        else
          authenticate_error
        end
      end
    end
  end
end
