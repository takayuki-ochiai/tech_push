# frozen_string_literal: true
class User < ApplicationRecord
  has_many :interests
  has_many :topics, through: :interests

  has_many :devices

  validates :admin_flg, inclusion: { in: [true, false] }

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
    self.access_token = "#{Devise.friendly_token}"
    save!
  end

  def self.find_by_authentication_token(access_token)
    user = User.find_by(access_token: access_token)
    user
  end

  def admin?
    admin_flg
  end
end
