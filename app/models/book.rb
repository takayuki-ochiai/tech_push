class Book < ApplicationRecord
  has_many :book_topics
  has_many :topic, through: :book_topics
  has_many :notifiers
  has_many :users, through: :notifiers

  validates :title, presence: true
  validates :publisher_name, presence: true
  validates :price, presence: true
  validates :sales_date, presence: true
  validates :isbn, presence: true, uniqueness: true
  validates :author, presence: true
  validates :display_flg, presence: true
end
