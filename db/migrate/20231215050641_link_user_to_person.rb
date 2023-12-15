class LinkUserToPerson < ActiveRecord::Migration[7.1]
  def change
    add_reference :users, :person, foreign_key: true
  end
end
