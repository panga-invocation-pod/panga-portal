class User < ApplicationRecord
  rolify

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable, :registerable,
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable

  def short_name
    email.split('@').first
  end
end
