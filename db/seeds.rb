# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'ostruct'

TopicTreePath.delete_all
# Topic.all.each(&:destroy)

rails_root = Dir.pwd
items = YAML.load_file("#{rails_root}/db/fixtures/topic.yml")

items.map do |item|
  OpenStruct.new(item)
end
.select do |item|
  item.type == 1
end
.each do |item|
  FirstTopic.create(
    id: item.id,
    name: item.name
  )

  TopicTreePath.create(
    ancestor_id: item.id,
    descendant_id: item.id
  )
end

items.map do |item|
  OpenStruct.new(item)
end
.select do |item|
  item.type == 2
end
.each do |item|
  topic = SecondTopic.create(
    id: item.id,
    name: item.name
  )

  TopicTreePath.create(
    ancestor_id: item.id,
    descendant_id: item.id
  )

  item.parent_ids.each { |parent_id|
    ancestor_topic_ids = TopicTreePath.where(descendant_id: parent_id).pluck(:ancestor_id)
    ancestor_topic_ids.each do |ancestor_topic_id|
      TopicTreePath.create(
        ancestor_id: ancestor_topic_id,
        descendant_id: item.id,
        parental_flg: true
      )
    end
  }
end
