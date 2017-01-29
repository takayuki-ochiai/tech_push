# frozen_string_literal: true

module ApplicationHelper
  def webpack_asset_path(path)
    if Rails.env.development?
      return "#{ENV['DEVELOP_WEBPACK_ASSETS_URL']}#{path}"
    end

    # sprocketsでdigestをつけさせるので、そのままのpathを返す
    path
    # 一回コメントアウト
    # host = Rails.application.config.action_controller.asset_host
    # manifest = Rails.application.config.assets.webpack_manifest
    # path = manifest[path] if manifest && manifest[path].present?
    # "#{host}/assets/#{path}"
  end
end
