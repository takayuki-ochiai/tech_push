# frozen_string_literal: true

using HashSerializeKeys
module V1
  # 書籍APIのためのクラス
  class BookAPI < Grape::API
    rescue_from StandardError do |e|
      Rails.logger.info(e.message)
      rack_response({ message: e.message, status: 500 }.to_json, 500)
    end

    resource :books do
      desc '書籍一覧を取得します'
      params do
        optional :page, type: Integer
        optional :per_page, type: Integer
      end
      get '/' do
        per_page = params[:per_page] || 10
        page = params[:page] || 1
        books = Book.where(
          'display_flg = :display_flg AND sales_date <= :sales_date',
          display_flg: true, sales_date: Date.today + 14.days
        ).limit(per_page).offset(per_page * (page - 1)).order(sales_date: :desc).map do |book|
          BookSerializer.new(book).serializable_hash
        end
        # 件数がページあたり件数未満の時は終端とみなす
        is_end = books.count < per_page

        { books: books, is_end: is_end }.camelize_keys
      end
    end
  end
end
