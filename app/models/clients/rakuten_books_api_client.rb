# frozen_string_literal: true

# 楽天書籍APIの通信用クライアントクラス
module RakutenBooksApiClient
  def self.search(params = { sort: '-releaseDate', booksGenreId: '001005' })
    RakutenWebService::Books::Book.search(params).map { |item| item }
  end
end
