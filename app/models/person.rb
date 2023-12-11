class Person < ApplicationRecord
  validates :short_name, :full_name, presence: true

  def to_s
    full_name
  end
end
