class User < ApplicationRecord
  rolify
  belongs_to :person

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable, :registerable,
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable

  def short_name
    email.split('@').first
  end

  private

  def password_required?
    email_required? && (!persisted? || !password.nil? || !password_confirmation.nil?)
  end

  def email_required?
    !email.nil?
  end
end
