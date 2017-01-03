# config valid only for current version of Capistrano
lock "3.7.1"

set :application, "tech_push"
set :repo_url, "git@github.com:takayuki-ochiai/tech_push.git"

# gitのリポジトリ接続に使う鍵
set :ssh_options, {
  # capistranoコマンド実行者の秘密鍵
  keys: %w(~/.ssh/id_rsa),
  forward_agent: true,
  auth_methods: %w(publickey)
}

# Default branch is :master
set :branch, ENV['BRANCH'] || 'master'

# deployするときのUser名（サーバ上にこの名前のuserが存在しAccessできることが必要）

set :puma_threds,  [4, 16]
set :puma_workers, 0
set :pty, true
#rbenvのoathが間違っているとrubyがインストールできていても認識してくれない
set :rbenv_path, '/usr/local/rbenv'
set :rbenv_ruby, '2.3.1'

set :use_sudo, false
set :deploy_via, :remote_cache

# 必要に応じて、gitignoreしているファイルにLinkを貼る
set :linked_files, %w{.env}
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# deploy先サーバにおく場所
set :deploy_to, "/home/suidenOTI/#{fetch(:application)}"

# bundle
# set :bundle_path, -> { shared_path.join('vendor/bundle') }

# Set Gemfile
# set :bundle_gemfile,  "/var/www/#{fetch(:application)}/Gemfile"

# 通常、shared_path は変数 :deploy_to で指定したディレクトリの下にある shared ディレクトリである。
# つまり、/var/www/tech_push にデプロイするなら/var/www/tech_push/sharedがshared_path

set :puma_bind,       "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{release_path}/log/puma.error.log"
set :puma_error_log,  "#{release_path}/log/puma.access.log"
set :ssh_options,     { forward_agent: true, user: fetch(:user), keys: %w(~/.ssh/id_rsa.pub), port: 22 }
set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_init_active_record, true  # Change to false when not using ActiveRecord

set :keep_releases, 5

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end

  before :start, :make_dirs
end

namespace :deploy do
  desc 'gitからcloneしてdeploy開始する前の確認'
  task :confirm do
    on roles(:app) do
      puts "This stage is '#{fetch(:stage)}'. Deploying branch is '#{fetch(:branch)}'."
      puts 'Are you sure? [y/n]'
      ask :answer, 'n'
      if fetch(:answer) != 'y'
        puts 'deploy stopped'
        exit
      end
    end
  end

  desc 'Initial Deploy'
  task :initial do
    on roles(:app) do
      before 'deploy:restart', 'puma:start'
      invoke 'deploy'
    end
  end

  desc '各環境で共通のファイルをアップロードする'
  task :upload_common_file do
    on roles(:app) do |host|
      # .envファイルをshared_pathにアップロード
      # アップロードされた.envはシンボリックリンク経由で使用する
      # TODO 開発環境マックのPATH直書きしてるのはどうにかしたい
      upload!('/Users/TakayukiOchiai/rails5/tech_push/config/puma.rb', "#{shared_path}/puma.rb")
    end
  end


  before :check,        :upload_common_file
  # before :check,        :upload_env_file
  before :starting,     :confirm
  after  :finishing,    :compile_assets
  after  :finishing,    :cleanup
end

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5
