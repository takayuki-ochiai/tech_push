class Notifier < ApplicationRecord
  belongs_to :book
  belongs_to :user

  validates :notified, presence: true
  validates :book_id, uniqueness: { scope: :user_id }
end
