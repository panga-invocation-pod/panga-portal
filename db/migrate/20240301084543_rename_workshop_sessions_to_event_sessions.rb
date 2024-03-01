class RenameWorkshopSessionsToEventSessions < ActiveRecord::Migration[7.1]
  def change
    rename_table :workshop_sessions, :event_sessions
    rename_column :workshop_attendances, :workshop_session_id, :event_session_id
  end
end
