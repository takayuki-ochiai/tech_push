class DeviceSerializer < ActiveModel::Serializer
  attributes :user_id,
    :one_signal_player_id,
    :device_model,
    :device_os
  belongs_to :user
end
