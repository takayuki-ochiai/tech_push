Rails.application.config.middleware.use OmniAuth::Builder do
  server_name = 'https://www.tech-push.com' if Rails.env.production?
  server_name = 'https://52.199.74.173' if Rails.env.staging?
  server_name = 'https://local.examples.com.dev:9292' unless server_name.present?
  provider :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_APP_SECRET'], callback_url: "#{server_name}/users/auth/facebook/callback"
end
