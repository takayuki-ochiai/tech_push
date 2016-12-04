class CreateInterests < ActiveRecord::Migration[5.0]
  def change
    create_table :interests do |t|
      t.references :topic, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps
    end

    add_index :interests, [:topic_id, :user_id], unique: true
  end
end
