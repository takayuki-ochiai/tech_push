# frozen_string_literal: true
class BookSerializer < ActiveModel::Serializer
  attributes :id,
             :title,
             :publisher_name,
             :author,
             :isbn,
             :price,
             :sales_date,
             :item_url,
             :small_image_url,
             :medium_image_url,
             :large_image_url
end
