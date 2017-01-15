module RakutenBooksFormatter
  def self.format(item)
    sales_date = Date.strptime(item.sales_date, "%Y年%m月%d日") rescue nil

    if sales_date.present?
      book = Book.new(
        title: item.title,
        title_kana: item.title_kana,
        publisher_name: item.publisher_name,
        author: item.author,
        author_kana: item.author_kana,
        small_image_url: item.small_image_url,
        medium_image_url: item.medium_image_url,
        large_image_url: item.large_image_url,
        isbn: item.isbn,
        price: item.item_price,
        sales_date: sales_date
      )
    end
    book
  end

  def self.format_items(items)
    books = items.map do |item|
      self.format(item)
    end.compact
  end
end
