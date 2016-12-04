class TopicTreePath < ApplicationRecord
  # TODO ツリー経路取得クエリ
  #
  validates :ancestor_id,
    presence: true,
    uniqueness: { scope: :descendant_id }

  validates :descendant_id,
    presence: true

  def self.create_tree_path(ancestor_id, parent_topic)
    TopicTreePath.create(
      ancestor_id: ancestor_id,
      descendant_id: parent_topic.id
    )
    parent_topic.child_topics.each do |child_topic|
      # 先祖のidをancestor_idにして子孫を渡て再帰呼び出し
      TopicTreePath.create_tree_path(ancestor_id, child_topic)
      # 自分自体をancestor_idとして子孫を渡て再帰呼び出し
      TopicTreePath.create_tree_path(child_topic.id, child_topic)
    end
  end
end
