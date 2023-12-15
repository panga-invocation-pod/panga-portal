class Person < ApplicationRecord
  validates :short_name, :full_name, presence: true
  has_one :user, dependent: :nullify

  def to_s
    full_name
  end
end
