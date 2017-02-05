# frozen_string_literal: true
class NoticeSerializer < ActiveModel::Serializer
  attributes :id,
             :book_id,
             :user_id,
             :contents
  belongs_to :book
end
