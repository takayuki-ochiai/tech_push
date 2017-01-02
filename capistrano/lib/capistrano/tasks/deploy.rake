namespace :deploy do
  desc 'Upload .env'
  task :upload_env do
    on roles(:app) do |host|
      # .envファイルを/var/www/tech_push/sharedにアップロード
      # アップロードされた.envはシンボリックリンク経由で使用する
      upload!('.env', "#{shared_path}/.env")
    end
  end
end
