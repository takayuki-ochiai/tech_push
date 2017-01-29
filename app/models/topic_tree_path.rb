# frozen_string_literal: true
class TopicTreePath < ApplicationRecord
  validates :ancestor_id,
            presence: true,
            uniqueness: { scope: :descendant_id }

  validates :descendant_id, presence: true
  validates :parental_flg, inclusion: { in: [true, false] }
end
