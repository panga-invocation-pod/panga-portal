class Person < ApplicationRecord
  validates :short_name, :full_name, presence: true
end
