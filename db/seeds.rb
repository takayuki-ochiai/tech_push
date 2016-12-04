# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


require 'csv'
Topic.delete_all
TopicTreePath.delete_all
i = 1
CSV.foreach('db/fixtures/topic.csv') do |row|
  if row[2] == '1'
    type = 'FirstTopic'
  elsif row[2] == '2'
    type = 'SecondTopic'
  else
    type = 'ThirdTopic'
  end

  Topic.create(
    id: row[0].to_i,
    name: row[1],
    type: type,
    parent_id: row[3]
  )
end


# TreePath作成
first_topics = FirstTopic.all
first_topics.each do |topic|
  # 自分の子供を取得する
  TopicTreePath.create_tree_path(topic.id, topic)
end
