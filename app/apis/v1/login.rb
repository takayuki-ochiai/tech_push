# frozen_string_literal: true

using HashSerializeKeys
module V1
  # ログイン関連のAPI用クラス
  class Login < Grape::API
    rescue_from StandardError do |e|
      Rails.logger.info(e.message)
      rack_response({ message: e.message, status: 500 }.to_json, 500)
    end

    # http://localhost:3000/api/v1/access_token
    resource :access_token do
      desc '現在のアクセストークンを戻す'
      get '/' do
        authenticate_user
        user = current_user
        user.update_access_token! unless user.access_token
        { access_token: user.access_token }.camelize_keys
      end
    end

    resource :access_token do
      desc '新しいアクセストークンを発行'
      post '/' do
        authenticate_user
        user = current_user
        user.update_access_token!
        { access_token: user.access_token }.camelize_keys
      end
    end
  end
end
