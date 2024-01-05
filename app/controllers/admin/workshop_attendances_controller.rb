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
end