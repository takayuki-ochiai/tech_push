class BookSerializer < ActiveModel::Serializer
  attributes :id,
    :title,
    :publisher_name,
    :author,
    :isbn,
    :price,
    :display_flg,
    :sales_date,
    :small_image_url,
    :medium_image_url,
    :large_image_url

end
