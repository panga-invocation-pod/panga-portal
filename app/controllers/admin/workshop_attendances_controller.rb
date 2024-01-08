class Admin::WorkshopAttendancesController < AdminController
  include Crud

  def make_invitee
    record.make_invitee!
    redirect_to admin_workshop_session_path(record.workshop_session)
  end

  def unmake_invitee
    record.unmake_invitee!
    redirect_to admin_workshop_session_path(record.workshop_session)
  end

  def retract_invitation
    record.retract_invitation!
    redirect_to admin_workshop_session_path(record.workshop_session)
  end

  def resend_invitation
    flash[:notice] = 'Invitation resent'
    record.resend_invitation!
    redirect_to admin_workshop_session_path(record.workshop_session)
  end
end