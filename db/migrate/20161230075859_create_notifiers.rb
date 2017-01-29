class CreateNotifiers < ActiveRecord::Migration[5.0]
  def change
    create_table :notices do |t|
      t.references :book, foreign_key: true
      t.references :user, foreign_key: true
      t.references :device, foreign_key: true
      t.boolean :notified, null: false, default: false
      # 送信したデバイスのデバイス情報
      t.string :one_signal_player_id, null: false
      t.string :device_model, null: false
      t.string :device_os, null: false
      # 送信した内容のタイトル
      t.string :headings, null: false
      # 送信した内容のコンテンツ
      t.string :contents, null: false

      t.timestamp :notify_schedule
      t.timestamp :notify_datetime
      t.timestamps
    end

    add_index :notices, [:book_id, :user_id], unique: true
  end
end
