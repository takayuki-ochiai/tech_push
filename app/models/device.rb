class Device < ApplicationRecord
  has_many :notices
  belongs_to :user
end
