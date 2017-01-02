namespace :utils do
  task :ls do
    on roles(:app) do
      execute "pwd"
      # info aaa
    end
  end
end
