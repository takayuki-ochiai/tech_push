class Admin::BooksController < ApplicationController
  before_action :admin_user!

  def index
    @books = Book.all
  end

  def edit
    @book = Book.find(params[:id])
    @select_topic_collections = SecondTopic.all
  end

  def update
    book_topics_attributes = book_params[:book_topics_attributes]
    BookTopic.where(book_id: params[:id]).delete_all
    book_topics_attributes.values.each { |book_topics_attribute|
      unless book_topics_attribute[:_destroy] == '1'
        BookTopic.create(
          book_id: book_topics_attribute[:book_id],
          topic_id: book_topics_attribute[:topic_id]
        )
      end
    }
    redirect_to admin_books_path
  end

  def destroy
    Book.find(params[:id]).destroy
    # BookTopic.where(book_id: params[:id]).delete_all
    redirect_to admin_books_path
  end

  private
    def book_params
      params.require(:book).permit(book_topics_attributes: [:id, :book_id, :topic_id, :_destroy])
    end
end
