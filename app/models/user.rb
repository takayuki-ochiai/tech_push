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
    self.access_token = "#{id}:#{Devise.friendly_token}"
    save!
  end

  def self.find_by_authentication_token(access_token)
    return unless access_token.include?(':')
    user_id = access_token.split(':').first
    user = User.where(id: user_id).first
    user if user && Devise.secure_compare(user.access_token, access_token)
  end

  def admin?
    admin_flg
  end
end
