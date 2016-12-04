class CreateBooks < ActiveRecord::Migration[5.0]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :publisher, null: false
      t.integer :price, null: false
      t.date :published, null: false
      t.timestamps
    end
  end
end
