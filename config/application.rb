require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Base
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    # ライブラリ直下のファイルを読み込む
    config.autoload_paths += %W(#{config.root}/lib)

    # app/customs
    config.paths.add File.join('app', 'customs'), glob: File.join('**', '*.rb')
    config.autoload_paths += Dir[Rails.root.join('app', 'customs', '*')]

    # app/errors/ 下のRuby ファイルが読み込まれるようにする
    config.paths.add File.join('app', 'errors'), glob: File.join('**', '*.rb')
    config.autoload_paths += Dir[Rails.root.join('app', 'errors', '*')]

    # app/apis/ 下の Ruby ファイルが読み込まれるようにする
    config.paths.add File.join('app', 'apis'), glob: File.join('**', '*.rb')
    config.autoload_paths += Dir[Rails.root.join('app', 'apis', '*')]

    # app/serializers/ 下の Ruby ファイルが読み込まれるようにする
    config.paths.add File.join('app', 'serializers'), glob: File.join('**', '*.rb')
    config.autoload_paths += Dir[Rails.root.join('app', 'serializers', '*')]
  end
end
