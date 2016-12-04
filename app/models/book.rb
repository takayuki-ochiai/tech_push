class Book < ApplicationRecord
  has_many :book_topics
  has_many :topic, through: :book_topics
  has_many :notifiers
  has_many :users, through: :notifiers

  validates :title, presence: true
  validates :publisher, presence: true
  validates :price, presence: true
  validates :published, presence: true
end
