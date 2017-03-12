# frozen_string_literal: true
class Topic < ApplicationRecord
  has_many :book_topics, dependent: :destroy
  has_many :books, through: :book_topics
  has_many :interests, dependent: :destroy
  has_many :users, through: :interests

  validates :id,
    presence: true,
    uniqueness: true
  validates :name, presence: true

  validates :type, presence: true

  def child_topics
    Topic.where(parent_id: id)
  end
end
