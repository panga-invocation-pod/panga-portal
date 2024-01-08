class AddInvitationToWorkshopAttendance < ActiveRecord::Migration[7.1]
  def up
    add_reference :workshop_attendances, :invitation, foreign_key: true, null: true

    WorkshopAttendance.all.each do |attendance|
      invitation = Invitation.where(invitee: attendance.person, workshop: attendance.workshop).first
      attendance.update!(invitation: invitation)
    end
  end

  def down
    remove_reference :workshop_attendances, :invitation
  end
end
