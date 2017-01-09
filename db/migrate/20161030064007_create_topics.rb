class CreateTopics < ActiveRecord::Migration[5.0]
  def change
    create_table :topics do |t|
      t.string :name, null: false
      t.string :type, null: false
      # t.integer :parent_id
      t.timestamps
    end

    # add_foreign_key :topics, :topics, column: :parent_id
  end
end
