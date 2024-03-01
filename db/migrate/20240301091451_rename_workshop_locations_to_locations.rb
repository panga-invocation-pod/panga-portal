class RenameWorkshopLocationsToLocations < ActiveRecord::Migration[7.1]
  def change
    rename_table :workshop_locations, :locations
    rename_column :event_sessions, :workshop_location_id, :location_id
  end
end
