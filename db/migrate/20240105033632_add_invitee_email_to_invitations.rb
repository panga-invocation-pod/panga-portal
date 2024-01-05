class AddInviteeEmailToInvitations < ActiveRecord::Migration[7.1]
  def change
    add_column :invitations, :invitee_email, :string, default: nil
  end
end
