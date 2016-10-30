using HashSerializeKeys
module V1
  class Sample < Grape::API
    rescue_from StandardError do |e|
      Rails.logger.info(e.message)
      rack_response({ message: e.message, status: 500 }.to_json, 500)
    end

    resource :test do
      desc 'テストレスポンス'
      get '/' do
        {test_test: 'testtest'}
      end
    end
  end
end
