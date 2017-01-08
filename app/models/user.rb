class User < ApplicationRecord
  has_many :interests
  has_many :topics, through: :interests

  has_many :notifiers
  has_many :books, through: :notifiers

  has_many :devices

  validates :admin_flg, inclusion: {in: [true, false]}

  # validates :name, presence: true
  # validates :email, presence: true
  # validates :encrypted_password, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :trackable,
         :omniauthable, omniauth_providers: [:facebook]

  after_create :update_access_token!

  def update_access_token!
    self.access_token = "#{self.id}:#{Devise.friendly_token}"
    self.save!
  end

  def self.find_by_authentication_token(access_token)
    unless access_token.include?(':')
      return
    end
    user_id = access_token.split(':').first
    user = User.where(id: user_id).first
    if user && Devise.secure_compare(user.access_token, access_token)
      user
    end
  end

  def admin?
    User.admin_flg
  end
end
