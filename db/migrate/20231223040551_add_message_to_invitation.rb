class AddMessageToInvitation < ActiveRecord::Migration[7.1]
  def change
    add_column :invitations, :message, :text
  end
end
