# frozen_string_literal: true
class Topic < ApplicationRecord
  has_many :book_topics
  has_many :books, through: :book_topics
  has_many :interests
  has_many :users, through: :interests

  validates :name, presence: true

  validates :type, presence: true

  def child_topics
    Topic.where(parent_id: id)
  end
end
