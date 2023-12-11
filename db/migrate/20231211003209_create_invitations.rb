class CreateInvitations < ActiveRecord::Migration[7.1]
  def change
    create_table :invitations do |t|
      t.belongs_to :inviter, null: false, foreign_key: { to_table: :people }
      t.belongs_to :invitee, null: false, foreign_key: { to_table: :people }
      t.string :token
      t.timestamps
    end
  end
end
