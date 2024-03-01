class WorkshopLocation < ApplicationRecord
  validates :name, presence: true
  validates :address_street, :address_city, :address_state, :address_traditional_country, presence: true

  composed_of :address, class_name: 'Address', mapping: [
    %w(address_name name),
    %w(address_street street),
    %w(address_city city),
    %w(address_state state),
    %w(address_postcode postcode),
    %w(address_traditional_country traditional_country)
  ]
end
