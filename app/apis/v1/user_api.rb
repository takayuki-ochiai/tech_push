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
          InterestSerializer.new(interest).serializable_hash
        }
        { interests: interests }.camelize_keys
      end
      resource :interests do
        desc "ログイン中のユーザーのフォロー情報を更新します"
        post '/follow' do
          user = current_user
          topic_ids = params[:topics].map(&:id)
          # TODO 存在しなかったら新規レコード作成、存在したら何もしない
          interests = Interest.where(user_id: user.id, topic_id: topic_ids)
          topic_ids.each { |id|
            present_interest = interests.any? { |interest|
              interest.id == id
            }
            unless present_interest
              Interest.create!(user_id: user.id, topic_id: id)
            end
          }

          { result: true }.camelize_keys
        end
      end
    end
  end
end
