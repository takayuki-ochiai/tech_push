class CreateBookTopics < ActiveRecord::Migration[5.0]
  def change
    create_table :book_topics do |t|
      t.references :book, foreign_key: true
      t.references :topic, foreign_key: true
      t.timestamps
    end

    add_index :book_topics, [:topic_id, :book_id], unique: true
  end
end
