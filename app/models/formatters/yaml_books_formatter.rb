require 'ostruct'
module YamlBooksFormatter
  def self.format(item)
    sales_date = Date.strptime(item.sales_date, '%Y/%m/%d') rescue nil
    book = Book.new(
      isbn: item.isbn,
      title: item.title,
      publisher_name: item.publisher_name,
      author: item.author,
      price: item.price,
      sales_date: sales_date,
      title_kana: item.title_kana,
      author_kana: item.author_kana,
      item_url: item.item_url,
      small_image_url: item.small_image_url,
      medium_image_url: item.medium_image_url,
      large_image_url: item.large_image_url
    )
    book
  end

  def self.format_items(file)
    items = YAML.load_file(file)
    items.map do |item|
      item = OpenStruct.new(item)
      format(item)
    end.compact
  end
end
