class AddSessionBelongsToLocation < ActiveRecord::Migration[7.1]
  def change
    add_belongs_to :workshop_sessions, :workshop_location, null: true, foreign_key: true
  end
end
