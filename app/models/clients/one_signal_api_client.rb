class OneSignalApiClient
  URI = "https://onesignal.com/api/v1"
  attr_reader :app_id, :rest_api_key

  # 初期化処理
  # app_idとapi_keyは環境変数から取得を想定
  def initialize(app_id, rest_api_key)
    @app_id = app_id || ENV["ONESIGNAL_APP_ID"]
    @rest_api_key = rest_api_key || ENV["ONESIGNAL_REST_API_KEY"]
    @conn = Faraday::Connection.new(:url => URI) do |builder|
      builder.use Faraday::Adapter::NetHttp     # Net/HTTP をアダプターに使う
    end
  end

  def notifi_messages(headings, contents, target_player_ids)
    response = @conn.post('notifications') do |req|
      req.headers["Content-Type"] = 'application/json'
      req.headers["Authorization"] = "Basic #{rest_api_key}"
      req.body = {
        app_id: app_id,
        # rest_api_key: rest_api_key,
        # headings: {en: "notification test", ja: "通知テストですよ"},
        # contents: {en: "This is notification test", ja: "通知のテストですよ"},
        # included_segments: ["All"]
        headings: headings,
        contents: contents,
        include_player_ids: target_player_ids
      }.to_json
    end
    # binding.pry

    apps = JSON.parse(response.body)
    apps
  end
end
