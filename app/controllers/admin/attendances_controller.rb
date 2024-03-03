class Admin::AttendancesController < AdminController
  include Crud

  def make_invitee
    record.make_invitee!
    redirect_to admin_event_session_path(record.event_session)
  end

  def unmake_invitee
    record.unmake_invitee!
    redirect_to admin_event_session_path(record.event_session)
  end

  def retract_invitation
    record.retract_invitation!
    redirect_to admin_event_session_path(record.event_session)
  end

  def resend_invitation
    flash[:notice] = 'Invitation resent'
    record.resend_invitation!
    redirect_to admin_event_session_path(record.event_session)
  end

  def mark_available
    record.mark_available!
    redirect_to action: :index
  end
end