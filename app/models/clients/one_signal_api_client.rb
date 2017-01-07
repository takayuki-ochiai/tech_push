module OneSignalApiClient
  # OneSignalApiClient.notifi_messages(
  #   {en: "notification test", ja: "通知テストですよ"},
  #   {en: "This is notification test", ja: "通知のテスト"},
  #   [user_id]
  # )

  URI = "https://onesignal.com/api/v1"
  APP_ID = ENV["ONESIGNAL_APP_ID"]
  REST_API_KEY = ENV["ONESIGNAL_REST_API_KEY"]
  CONN = Faraday::Connection.new(:url => URI) do |builder|
    builder.use Faraday::Adapter::NetHttp     # Net/HTTP をアダプターに使う
  end

  def self.notifi_messages(headings, contents, target_player_ids)
    response = CONN.post('notifications') do |req|
      req.headers["Content-Type"] = 'application/json'
      req.headers["Authorization"] = "Basic #{REST_API_KEY}"
      req.body = {
        app_id: APP_ID,
        headings: headings,
        contents: contents,
        include_player_ids: target_player_ids
      }.to_json
    end

    apps = JSON.parse(response.body)
    apps
  end
end
