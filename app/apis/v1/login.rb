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
        uid = request.headers['Uid']
        fb_token = request.headers['Fb-Token']
        # uid とfacebook access_tokenを認証
        return { access_token: nil }.camelize_keys unless fb_token

        graph = Koala::Facebook::API.new(fb_token)
        token_info = graph.debug_token(fb_token)
        if token_info['data']['is_valid'] && token_info['data']['user_id'] == uid && token_info['data']['app_id'] == ENV['FACEBOOK_APP_ID']
          # 認証できないuidだったら空で返却
          # userが登録されている場合はaccess_tokenを返す
          # 登録されていない場合は
          user = User.find_by(uid: uid)
          unless user
            user = User.create(
              provider: 'facebook',
              uid: uid,
              access_token: Devise.friendly_token
            )
          end
          return { access_token: user.try(:access_token) }.camelize_keys
        end

        { access_token: nil }.camelize_keys
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
