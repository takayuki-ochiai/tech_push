class Interest < ApplicationRecord
  belongs_to :topic
  belongs_to :user

  validates :topic_id, uniqueness: { scope: :user_id }
end
