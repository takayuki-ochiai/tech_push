using HashSerializeKeys
module V1
  class Topic < Grape::API
    rescue_from StandardError do |e|
      Rails.logger.info(e.message)
      rack_response({ message: e.message, status: 500 }.to_json, 500)
    end

    before do
      authenticate_user
    end

    # http://localhost:3000/api/v1/test
    post '/test' do
      {call_back: "コールバック"}.camelize_keys
    end
  end
end
