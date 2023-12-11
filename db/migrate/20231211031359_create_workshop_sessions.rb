class CreateWorkshopSessions < ActiveRecord::Migration[7.1]
  def change
    create_table :workshop_sessions do |t|
      t.belongs_to :workshop, null: false, foreign_key: true
      t.datetime :start_at, null: false
      t.datetime :end_at, null: false
      t.timestamps
    end
  end
end
