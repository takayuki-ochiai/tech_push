class Admin::BooksController < ApplicationController
  before_action :admin_user!

  def index
    @books = Book.all.includes(:topics).order("sales_date DESC")
  end

  def edit
    @book = Book.find(params[:id])
    @select_topic_collections = SecondTopic.all.order(:name)
  end

  def update
    @book = Book.find(params[:id])
    @book.update(
      display_flg: book_params[:display_flg]
    )
    book_topics_attributes = book_params[:book_topics_attributes]

    BookTopic.where(book_id: params[:id]).delete_all
    if book_topics_attributes.present?
      book_topics_attributes.values.each { |book_topics_attribute|
        unless book_topics_attribute[:_destroy] == '1'
          BookTopic.create(
            book_id: book_topics_attribute[:book_id],
            topic_id: book_topics_attribute[:topic_id]
          )
        end
      }
    end

    redirect_to admin_books_path
  end

  def destroy
    Book.find(params[:id]).destroy
    redirect_to admin_books_path
  end

  private
    def book_params
      params.require(:book).permit(:display_flg, book_topics_attributes: [:id, :book_id, :topic_id, :_destroy])
    end
end
