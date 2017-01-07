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

    # dotenvで.envを読み込み
    Dotenv::Railtie.load

    # ライブラリ直下のファイルを読み込む
    config.autoload_paths += %W(#{config.root}/lib)

    # app/models内のサブディレクトリのファイルが読み込まれるようにする
    config.autoload_paths += Dir[Rails.root.join('app', 'models', '{*/}')]

    # app/apis/ 下の Ruby ファイルが読み込まれるようにする
    config.paths.add File.join('app', 'apis'), glob: File.join('**', '*.rb')
    config.autoload_paths += Dir[Rails.root.join('app', 'apis', '*')]
  end
end
