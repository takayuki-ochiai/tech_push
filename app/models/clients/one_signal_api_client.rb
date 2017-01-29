module OneSignalApiClient
  # OneSignalApiClient.notifi_messages(
  #   {en: "notification test", ja: "通知テストですよ"},
  #   {en: "This is notification test", ja: "通知のテスト"},
  #   [user_id]
  # )

  URI = 'https://onesignal.com/api/v1'.freeze
  APP_ID = ENV['ONESIGNAL_APP_ID']
  REST_API_KEY = ENV['ONESIGNAL_REST_API_KEY']
  CONN = Faraday::Connection.new(url: URI) do |builder|
    # Net/HTTP をアダプターに使う
    builder.use Faraday::Adapter::NetHttp
  end

  def self.notifi_messages(headings, contents, target_player_ids)
    response = CONN.post('notifications') do |req|
      req.headers['Content-Type'] = 'application/json'
      req.headers['Authorization'] = "Basic #{REST_API_KEY}"
      req.body = {
        app_id: APP_ID,
        headings: { en: 'English is not supported in TechPush', ja: headings },
        contents: { en: 'English is not supported in TechPush', ja: contents },
        include_player_ids: target_player_ids
      }.to_json
    end

    body = JSON.parse(response.body)
    body
  end
end
