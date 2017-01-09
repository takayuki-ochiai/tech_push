class TopicTreePathSerializer < ActiveModel::Serializer
  attributes :ancestor_id, :descendant_id, :parental_flg
end
