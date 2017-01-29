# frozen_string_literal: true
class BookTopic < ApplicationRecord
  belongs_to :book
  belongs_to :topic

  validates :topic_id, presence: true
  validates :book_id,
            presence: true,
            uniqueness: { scope: :topic_id }
end
