# frozen_string_literal: true
class TopicSerializer < ActiveModel::Serializer
  attributes :id, :name, :type
end
