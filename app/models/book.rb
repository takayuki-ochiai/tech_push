class Book < ApplicationRecord
  has_many :book_topics
  has_many :topic, through: :book_topics
  has_many :notifiers
  has_many :users, through: :notifiers

  validates :title, presence: true
  validates :publisher_name, presence: true
  validates :price, presence: true
  validates :sales_date, presence: true
  validates :isbn, presence: true, uniqueness: true
  validates :display_flg, inclusion: {in: [true, false]}

  def save_with_isbn
    book = Book.find_by(isbn: self.isbn)
    if book.present?
      attributes = self.attributes
      attributes.except!("id", "created_at", "updated_at")
      attributes["display_flg"] = book.display_flg
      book.update!(attributes)
    else
      self.save
    end
  end
end
