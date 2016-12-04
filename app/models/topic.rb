class Topic < ApplicationRecord
  has_many :book_topics
  has_many :topics, through: :book_topics
  has_many :interests
  has_many :users, through: :interests

  validates :name,
    presence: true

  validates :type, presence: true

  def child_topics
    Topic.where(parent_id: self.id)
  end

  # TODO ツリー経路取得クエリ
end
