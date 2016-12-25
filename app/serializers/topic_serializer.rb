class TopicSerializer < ActiveModel::Serializer
  attributes :id, :name, :type, :parent_id
end
