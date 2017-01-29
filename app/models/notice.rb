class Notice < ApplicationRecord
  belongs_to :book
  belongs_to :user
  belongs_to :device

  validates :notified, presence: true
  validates :book_id, uniqueness: { scope: :user_id }
end
