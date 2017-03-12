Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_APP_SECRET'], callback_url: "#{ENV['SERVER_NAME']}/users/auth/facebook/callback"
end
