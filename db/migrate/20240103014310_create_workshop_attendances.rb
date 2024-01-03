class CreateWorkshopAttendances < ActiveRecord::Migration[7.1]
  def change
    create_table :workshop_attendances do |t|
      t.string :aasm_state
      t.references :workshop_session, null: false, foreign_key: true
      t.references :person, null: false, foreign_key: true
      t.timestamps
    end
  end
end
