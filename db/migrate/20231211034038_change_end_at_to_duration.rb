class ChangeEndAtToDuration < ActiveRecord::Migration[7.1]
  def change
    remove_column :workshop_sessions, :end_at
    add_column :workshop_sessions, :duration_minutes, :integer
  end
end
