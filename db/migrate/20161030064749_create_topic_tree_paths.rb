class CreateTopicTreePaths < ActiveRecord::Migration[5.0]
  def change
    create_table :topic_tree_paths do |t|
      t.integer :ancestor_id, null: false
      t.integer :descendant_id, null: false
      t.timestamps
    end

    add_index :topic_tree_paths, [:ancestor_id, :descendant_id], unique: true
    add_foreign_key :topic_tree_paths, :topics, column: :ancestor_id
    add_foreign_key :topic_tree_paths, :topics, column: :descendant_id
  end
end
