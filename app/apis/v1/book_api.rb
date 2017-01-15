using HashSerializeKeys
module V1
  class BookAPI < Grape::API
    rescue_from StandardError do |e|
      Rails.logger.info(e.message)
      rack_response({ message: e.message, status: 500 }.to_json, 500)
    end

    before do
      authenticate_user
    end

    resource :books do
      desc "書籍一覧を取得します"
      get '/' do
        books = Book.where(display_flg: true).map { |book|
          BookSerializer.new(book).serializable_hash
        }
        { books: books }.camelize_keys
      end
    end
  end
end
