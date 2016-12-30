class CreateDevices < ActiveRecord::Migration[5.0]
  def change
    create_table :devices do |t|
      t.references :user, foreign_key: true
      t.string :one_signal_player_id, null: false
      t.string :device_model, null: false
      t.string :device_os, null: false
      t.string :type, null: false
      t.timestamps
    end
  end
end
