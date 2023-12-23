class AddAasmStateToInvitations < ActiveRecord::Migration[7.1]
  def change
    add_column :invitations, :aasm_state, :string
  end
end
