Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '191905821214278', 'c4d4203405a16263579c55c61ea99ad1'
  #, callback_path: '/api/v1/auth/facebook'


  # provider :github, ENV['GITHUB_KEY'], ENV['GITHUB_SECRET']
end
