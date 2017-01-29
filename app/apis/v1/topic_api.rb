# frozen_string_literal: true

using HashSerializeKeys
module V1
  # トピック情報取得API用のクラス
  class TopicAPI < Grape::API
    rescue_from StandardError do |e|
      Rails.logger.info(e.message)
      rack_response({ message: e.message, status: 500 }.to_json, 500)
    end

    before do
      authenticate_user
    end

    get '/topics' do
      topics = Topic.all.map do |topic|
        TopicSerializer.new(topic).serializable_hash
      end
      topic_tree_pathes = TopicTreePath.all.map do |topic_tree_path|
        TopicTreePathSerializer.new(topic_tree_path).serializable_hash
      end
      {
        topics: topics,
        topic_tree_pathes: topic_tree_pathes
      }.camelize_keys
    end
  end
end
