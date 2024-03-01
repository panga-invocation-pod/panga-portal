class RenameWorkshopAttendancesToAttendances < ActiveRecord::Migration[7.1]
  def change
    rename_table :workshop_attendances, :attendances
  end
end
