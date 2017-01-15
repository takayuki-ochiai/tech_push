class Book < ApplicationRecord
  has_many :book_topics, dependent: :delete_all
  has_many :topics, through: :book_topics
  has_many :notifiers
  has_many :users, through: :notifiers

  validates :title, presence: true
  validates :publisher_name, presence: true
  validates :price, presence: true
  validates :sales_date, presence: true
  validates :isbn, presence: true, uniqueness: true
  validates :item_url, presence: true
  validates :display_flg, inclusion: {in: [true, false]}

  accepts_nested_attributes_for :book_topics, allow_destroy: true

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
