class CreateBooks < ActiveRecord::Migration[5.0]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :title_kana
      t.string :publisher_name, null: false
      t.string :author, null: false
      t.string :author_kana
      t.text :item_url, null: false
      t.text :small_image_url
      t.text :medium_image_url
      t.text :large_image_url
      t.string :isbn, null: false
      t.integer :price, null: false
      t.boolean :display_flg, default: false, null: false
      t.date :sales_date, null: false
      t.timestamps
    end

    add_index :books, :isbn, unique: true
  end
end
