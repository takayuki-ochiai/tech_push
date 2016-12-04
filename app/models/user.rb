class User < ApplicationRecord
  has_many :interests
  has_many :topics, through: :interests

  has_many :notifiers
  has_many :books, through: :notifiers

  # validates :name, presence: true
  validates :email, presence: true
  validates :encrypted_password, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :trackable, :validatable

  include DeviseTokenAuth::Concerns::User
  # 何らかの理由でinclude DeviseTokenAuth::Concerns::Userがomniauthableを取り除いてしまうらしいので
  # DeviseTokenAuth::Concerns::Userのincludeのあとで再読み込み
  devise :omniauthable, omniauth_providers: [:facebook]

  def self.find_for_oauth(auth)
    user = User.where(uid: auth.uid, provider: auth.provider).first
    unless user
      user = User.create(
        uid:      auth.uid,
        provider: auth.provider,
        email:    User.dummy_email(auth),
        password: Devise.friendly_token[0, 20]
      )
    end
    user
  end
end
