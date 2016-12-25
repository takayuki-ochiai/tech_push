using HashSerializeKeys
module V1
  class TopicAPI < Grape::API
    rescue_from StandardError do |e|
      Rails.logger.info(e.message)
      rack_response({ message: e.message, status: 500 }.to_json, 500)
    end

    before do
      authenticate_user
    end

    get '/topics' do
      topics = Topic.all.map { |topic|
        TopicSerializer.new(topic).serializable_hash
      }
      { topics: topics }.camelize_keys
    end
  end
end
