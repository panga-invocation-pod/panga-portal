class CreatePeople < ActiveRecord::Migration[7.1]
  def change
    create_table :people do |t|
      t.string :short_name
      t.string :full_name
      t.timestamps
    end
  end
end
