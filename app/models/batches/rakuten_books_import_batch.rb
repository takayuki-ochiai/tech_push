# frozen_string_literal: true

module RakutenBooksImportBatch
  # なぜか別環境で動かなくなるので一回コメントアウト
  # private_class_method :create_params

  def self.execute(
    params = nil,
    limit_date = Date.today
  )
    params = create_params(params)

    loop do
      book_items = RakutenBooksApiClient.search(params)
      books = RakutenBooksFormatter.format_items(book_items)
      import_books = books.select { |book| book.sales_date >= limit_date }
      break if import_books.empty?
      import_books.each(&:save_with_isbn)
      params[:page] += 1
    end
  end

  def self.create_params(params)
    default_params = {
      sort: '-releaseDate',
      booksGenreId: '001005',
      page: 1
    }

    return default_params unless params.present?

    params.merge(default_params)
    params
  end
end
