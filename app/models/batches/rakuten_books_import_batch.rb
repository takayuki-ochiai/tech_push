module RakutenBooksImportBatch
  def self.execute(params = nil, limit_date = Date.today)
    params = self.create_params(params)

    while true
      book_items = RakutenBooksApiClient.search(params)
      books = RakutenBooksFormatter.format_items(book_items)
      save_books = books.select { |book| book.sales_date >= limit_date }
      if save_books.empty?
        break
      end
      save_books.each do |import_book|
        book = Book.find_by(isbn: import_book.isbn)
        if book.present?
          attributes = import_book.attributes
          attributes.delete("id")
          attributes.delete("created_at")
          attributes.delete("updated_at")

          book.update(attributes)
        else
          import_book.save
        end
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
