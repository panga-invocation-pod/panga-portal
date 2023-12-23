class Admin::InvitationsController < AdminController
  include Crud

  private

  def permit_record_fields(fields)
    fields.permit(:inviter_id, :invitee_id, :token, :message)
  end
end