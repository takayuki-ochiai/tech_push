class CreateNotifiers < ActiveRecord::Migration[5.0]
  def change
    create_table :notifiers do |t|
      t.references :book, foreign_key: true
      t.references :user, foreign_key: true
      t.boolean :notified, null: false, default: false
      t.timestamp :notify_schedule
      t.timestamp :notify_datetime
      t.timestamps
    end

    add_index :notifiers, [:book_id, :user_id], unique: true
  end
end
