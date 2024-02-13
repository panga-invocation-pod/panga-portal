class CreateWorkshopLocations < ActiveRecord::Migration[7.1]
  def change
    create_table :workshop_locations do |t|
      t.string :name
      t.text :directions
      t.text :accessibility
      t.string :address_name
      t.string :address_street
      t.string :address_city
      t.string :address_state
      t.string :address_postcode
      t.string :address_traditional_country
      t.timestamps
    end
  end
end
