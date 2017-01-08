class Admin::BooksController < ApplicationController
  before_action :admin_user!

  def index
    @books = Book.all
  end

  def edit
    @book = Book.find(params[:id])
  end
end
