class WorkshopLocation < ApplicationRecord
  validates :name, presence: true
  validates :address_street, :address_city, :address_state, :address_traditional_country, presence: true
end
