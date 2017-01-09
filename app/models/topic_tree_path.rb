class TopicTreePath < ApplicationRecord
  # TODO ツリー経路取得クエリ
  #
  validates :ancestor_id,
    presence: true,
    uniqueness: { scope: :descendant_id }

  validates :descendant_id, presence: true

  validates :parental_flg, inclusion: {in: [true, false]}
end
