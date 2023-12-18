class AllowNilPasswordForUsers < ActiveRecord::Migration[7.1]
  def change
    change_column :users, :encrypted_password, :string, :null => true, default: nil
    change_column :users, :email, :string, :null => true, default: nil
  end
end
