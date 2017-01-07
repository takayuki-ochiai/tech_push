module RakutenBooksApiClient
  def self.search(params= { sort: "-releaseDate", booksGenreId: '001005'})
    books = RakutenWebService::Books::Book
      .search(params)
      .map { |item| item }
  end
end
