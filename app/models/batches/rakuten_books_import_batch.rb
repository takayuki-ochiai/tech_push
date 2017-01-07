module RakutenBooksImportBatch
  def self.execute(params = nil, limit_date = Date.today)
    params = self.create_params(params)

    while true
      book_items = RakutenBooksApiClient.search(params)
      books = RakutenBooksFormatter.format_items(book_items)
      import_books = books.select { |book| book.sales_date >= limit_date }
      break if import_books.empty?
      import_books.each do |import_book|
        import_book.save_with_isbn
      end

      params[:page] += 1
    end
  end

  private
    def self.create_params(params)
      default_params = {
        sort: "-releaseDate",
        booksGenreId: '001005',
        page: 1
      }

      return default_params unless params.present?

      params.merge(default_params)
      params
    end
end
