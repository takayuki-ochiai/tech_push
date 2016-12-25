using HashSerializeKeys
module V1
  class UserAPI < Grape::API
    rescue_from StandardError do |e|
      Rails.logger.info(e.message)
      rack_response({ message: e.message, status: 500 }.to_json, 500)
    end

    before do
      authenticate_user
    end

    resource :user do
      desc "ログイン中のユーザーのトピック情報を取得します"
      get '/interests' do
        interests = Interest.where(user_id: current_user.id).map { |interest|
          InterestSerializer.new(topic).serializable_hash
        }
        { interests: interests }.camelize_keys
      end
    end
  end
end
