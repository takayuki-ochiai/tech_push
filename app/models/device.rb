class Device < ApplicationRecord
  has_many :notifiers
  CHROME = 'Chrome'
  SAFARI = 'Safari'
  FIREFOX = 'Firefox'
  IOS = 'iOS'

  def self.create_suitable_device!(user, params)
    case params[:type]
    when CHROME
      ChromeDevice.create!(
        user_id: user.id,
        one_signal_player_id: params[:one_signal_player_id],
        device_model: params[:device_model],
        device_os: params[:device_os]
      )
    when SAFARI
      SafariDevice.create!(
        user_id: user.id,
        one_signal_player_id: params[:one_signal_player_id],
        device_model: params[:device_model],
        device_os: params[:device_os]
      )
    when FIREFOX
      FirefoxDevice.create!(
        user_id: user.id,
        one_signal_player_id: params[:one_signal_player_id],
        device_model: params[:device_model],
        device_os: params[:device_os]
      )
    when IOS
      IOSDevice.create!(
        user_id: user.id,
        one_signal_player_id: params[:one_signal_player_id],
        device_model: params[:device_model],
        device_os: params[:device_os]
      )
    end
  end
end
