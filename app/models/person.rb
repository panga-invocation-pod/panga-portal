class Person < ApplicationRecord
  validates :short_name, :full_name, presence: true
  has_one :user, dependent: :nullify

  has_one_attached :avatar do |attachable|
    attachable.variant :thumb, resize_to_fill: [100, 100]
  end

  def to_s
    full_name
  end
end
