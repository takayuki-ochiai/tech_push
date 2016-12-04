using HashSerializeKeys
module V1
  class Auth < Grape::API
    rescue_from StandardError do |e|
      Rails.logger.info(e.message)
      rack_response({ message: e.message, status: 500 }.to_json, 500)
    end

    # http://localhost:3000/api/v1/test
    resource :test do
      desc 'テストレスポンス'
      get '/' do
        {test_test: 'testtest'}
      end
    end
  end
end
