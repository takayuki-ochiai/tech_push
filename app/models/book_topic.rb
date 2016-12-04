class BookTopic < ApplicationRecord
  belongs_to :book
  belongs_to :topic

  validates :book_id, uniqueness: { scope: :topic_id }
end
