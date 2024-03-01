class RenameWorkshopsToEvents < ActiveRecord::Migration[7.1]
  def change
    rename_table :workshops, :events
    rename_column :workshop_sessions, :workshop_id, :event_id
    rename_column :invitations, :workshop_id, :event_id
  end
end
