class AddWorkshopToInvitation < ActiveRecord::Migration[7.1]
  def up
    add_belongs_to :invitations, :workshop, foreign_key: true, null: true

    Invitation.all.each do |invitation|
      invitation.workshop = Workshop.find_by_name("Panga Context Setting")
      invitation.save!
    end
  end

  def down
    remove_belongs_to :invitations, :workshop, foreign_key: true, null: true
  end
end
