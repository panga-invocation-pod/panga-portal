class AllowNilUserEmail < ActiveRecord::Migration[7.1]
  def up
    remove_index :users, :email
    change_column :users, :email, :string, :null => true
    add_index :users, :email, unique: true, where: 'email IS NOT NULL'
  end

  def down
    remove_index :users, :email
    change_column :users, :email, :string, :null => false
    add_index :users, :email, unique: true
  end
end
